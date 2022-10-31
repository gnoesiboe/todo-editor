import { FC } from 'react';
import { Editor, EditorState } from 'draft-js';
import { persistEditorStateToTempStorage } from './storage/tempStorage';
import useHandleKeyCommands from './hooks/useHandleKeyCommands';
import { useTodosContext } from '../../context/todos/TodosContext';

export type OnEditorChangeHandler = (editorState: EditorState) => void;

const TodosEditor: FC = () => {
    const { editorState, setEditorState } = useTodosContext();

    const onChange: OnEditorChangeHandler = (editorState): void => {
        setEditorState(editorState);

        persistEditorStateToTempStorage(editorState);
    };

    const handleKeyCommands = useHandleKeyCommands(onChange);

    return (
        <div className="bg-gray-200 p-4 font-mono text-sm">
            <Editor
                editorState={editorState}
                onChange={onChange}
                handleKeyCommand={handleKeyCommands}
            />
        </div>
    );
};

export default TodosEditor;
