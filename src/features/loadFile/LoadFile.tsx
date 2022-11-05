import { ChangeEventHandler, FC, MouseEventHandler } from 'react';
import { useTodosContext } from '../../context/todos/TodosContext';
import { ContentState, EditorState } from 'draft-js';
import { createEditorDecorator } from '../todosEditor/decorator/decoratorFactory';

const LoadFile: FC = () => {
    const { setEditorState } = useTodosContext();

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const files = event.target.files;
        const selectedFile: File | undefined = files
            ? Array.from(files)[0]
            : undefined;

        if (selectedFile) {
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

    return (
        <div>
            <input
                type="file"
                id="input"
                accept=".md,.txt"
                onChange={onChange}
                multiple={false}
            />
        </div>
    );
};

export default LoadFile;
