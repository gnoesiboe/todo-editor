import { ChangeEventHandler, useState } from 'react';
import { ContentState, EditorState } from 'draft-js';
import { createEditorDecorator } from '../../todosEditor/decorator/decoratorFactory';
import { useTodosContext } from '../../../context/todos/TodosContext';

type Output = {
    onFileChange: ChangeEventHandler<HTMLInputElement>;
    lastUploadedFileName: string | null;
};

export default function useLoadSelectedFile(): Output {
    const { setEditorState } = useTodosContext();

    const [lastUploadedFileName, setLastUploadedFileName] = useState<
        string | null
    >(null);

    const onFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const files = event.target.files;
        const selectedFile: File | undefined = files
            ? Array.from(files)[0]
            : undefined;

        if (selectedFile) {
            setLastUploadedFileName(selectedFile.name);

            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                const data = event.target?.result?.toString() || '';

                const dataUrlParts = data.split(`base64,`);
                const base64encodedContent =
                    dataUrlParts[dataUrlParts.length - 1];
                const asString = window.atob(base64encodedContent);

                const newEditorState = EditorState.createWithContent(
                    ContentState.createFromText(asString, '\n'),
                    createEditorDecorator(),
                );

                setEditorState(newEditorState);
            });
            reader.readAsDataURL(selectedFile);
        }
    };

    return { onFileChange, lastUploadedFileName };
}
