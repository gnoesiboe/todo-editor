import {
    MouseEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { ContentState, EditorState } from 'draft-js';
import { createEditorDecorator } from '../../todosEditor/decorator/decoratorFactory';
import { useTodosContext } from '../../../context/todos/TodosContext';
import { getFileHandle, saveFileHandle } from '../storage/fileHandleStorage';

type Output = {
    onOpenClick: MouseEventHandler<HTMLButtonElement>;
    onSaveClick: MouseEventHandler<HTMLButtonElement>;
    hasFileHandle: boolean;
    isSaving: boolean;
};

export default function useFile(): Output {
    const isLoadingFileRef = useRef<boolean>(false);

    const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(
        null,
    );

    const { editorState, setEditorState, markSaved } = useTodosContext();

    const loadFileFromFileHandle = useCallback(
        async (fileHandle: FileSystemFileHandle) => {
            if (isLoadingFileRef.current) {
                return;
            }

            isLoadingFileRef.current = true;

            const permissionDescriptor: FileSystemHandlePermissionDescriptor = {
                mode: 'readwrite',
            };

            const existingVerdict = await fileHandle.queryPermission(
                permissionDescriptor,
            );
            console.log('existing verdict', existingVerdict);

            if (existingVerdict !== 'granted') {
                const newVerdict = await fileHandle.requestPermission(
                    permissionDescriptor,
                );
                console.log('result requested verdict', newVerdict);

                if (newVerdict !== 'granted') {
                    console.error(
                        `no permission granted to read write file: '${fileHandle.name}'`,
                    );

                    isLoadingFileRef.current = false;

                    return;
                }
            }

            const file = await fileHandle.getFile();
            const contents = await file.text();

            const newEditorState = EditorState.createWithContent(
                ContentState.createFromText(contents, '\n'),
                createEditorDecorator(),
            );

            setEditorState(newEditorState);

            isLoadingFileRef.current = false;
        },
        [setEditorState],
    );

    useEffect(() => {
        if (fileHandle) {
            return;
        }

        getFileHandle().then((existingFileHandle) => {
            if (existingFileHandle) {
                setFileHandle(existingFileHandle);

                // noinspection JSIgnoredPromiseFromCall
                loadFileFromFileHandle(existingFileHandle);
            }
        });
    }, [fileHandle, loadFileFromFileHandle]);

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const onOpenClick: MouseEventHandler<HTMLButtonElement> = async () => {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: 'Markdown',
                    accept: {
                        'text/markdown': ['.md', '.MD'],
                    },
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false,
        });

        setFileHandle(fileHandle);

        await saveFileHandle(fileHandle);

        await loadFileFromFileHandle(fileHandle);
    };

    const contentState = editorState.getCurrentContent();

    const save = useCallback(async () => {
        if (!fileHandle) {
            console.warn('no file handle to save');

            return;
        }

        setIsSaving(true);

        const writable = await fileHandle.createWritable();

        const content = contentState.getPlainText('\n');

        await writable.write(content);

        await writable.close();

        markSaved();

        setIsSaving(false);
    }, [contentState, fileHandle, markSaved]);

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                event.stopPropagation();

                // noinspection JSIgnoredPromiseFromCall
                save();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [contentState, save]);

    const onSaveClick: MouseEventHandler<HTMLButtonElement> = async () => {
        if (!fileHandle) {
            throw new Error(
                'Expecting file handle to be available at this point',
            );
        }

        await save();
    };

    return { onOpenClick, onSaveClick, hasFileHandle: !!fileHandle, isSaving };
}
