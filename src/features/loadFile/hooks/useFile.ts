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
import {
    fileOpen,
    fileSave,
    FileWithHandle,
    supported,
} from 'browser-fs-access';

if (supported) {
    console.log('Using the File System Access API.');
} else {
    console.warn('Using the fallback implementation.');
}

type Output = {
    onOpenClick: MouseEventHandler<HTMLButtonElement>;
    onSaveClick: MouseEventHandler<HTMLButtonElement>;
    hasFileLoaded: boolean;
    isSaving: boolean;
};

export default function useFile(): Output {
    const isLoadingFileRef = useRef<boolean>(false);

    const [file, setFile] = useState<FileWithHandle | null>(null);
    const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(
        null,
    );

    const { editorState, setEditorState, markSaved } = useTodosContext();

    const loadFile = useCallback(
        async (
            file: FileWithHandle | null,
            fileHandle: FileSystemFileHandle | null,
        ) => {
            if (isLoadingFileRef.current) {
                return;
            }

            isLoadingFileRef.current = true;

            let contents: string;

            if (file) {
                contents = await file.text();
            } else if (fileHandle) {
                const permissionDescriptor: FileSystemHandlePermissionDescriptor =
                    {
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
                contents = await file.text();
            } else {
                throw new Error(
                    'Expecting there to be either a file or a file handle',
                );
            }

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
                loadFile(null, existingFileHandle);
            }
        });
    }, [fileHandle, loadFile]);

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const onOpenClick: MouseEventHandler<HTMLButtonElement> = async () => {
        const file = await fileOpen({
            mimeTypes: ['text/markdown'],
            excludeAcceptAllOption: true,
            multiple: false,
        });

        setFile(file);

        const fileHandle = file.handle || null;
        if (fileHandle) {
            setFileHandle(fileHandle);

            await saveFileHandle(fileHandle);
        }

        await loadFile(file, fileHandle);
    };

    const contentState = editorState.getCurrentContent();

    const save = useCallback(async () => {
        if (!fileHandle) {
            console.warn('no file handle to save');

            return;
        }

        setIsSaving(true);

        if (file) {
            await fileSave(file);
        } else if (fileHandle) {
            const writable = await fileHandle.createWritable();

            const content = contentState.getPlainText('\n');

            await writable.write(content);

            await writable.close();
        } else {
            throw new Error('Expecting there to be file and/or a file handle');
        }

        markSaved();

        setIsSaving(false);
    }, [contentState, file, fileHandle, markSaved]);

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

    const hasFileLoaded = !!fileHandle || !!file;

    return {
        onOpenClick,
        onSaveClick,
        hasFileLoaded,
        isSaving,
    };
}
