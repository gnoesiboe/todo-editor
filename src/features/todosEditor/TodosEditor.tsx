import { FC, useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import {
    getEditorStateFromTempStorage,
    persistEditorStateToTempStorage,
} from './storage/tempStorage';
import useHandleKeyCommands from './hooks/useHandleKeyCommands';
import { createEditorDecorator } from './decorator/decoratorFactory';

export type OnEditorChangeHandler = (editorState: EditorState) => void;

const TodosEditor: FC = () => {
    const [editorState, setEditorState] = useState(() => {
        const decorator = createEditorDecorator();

        return (
            getEditorStateFromTempStorage(decorator) ||
            EditorState.createEmpty(decorator)
        );
    });

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
