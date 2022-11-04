import { FC, useEffect, useRef } from 'react';
import { Editor, EditorState } from 'draft-js';
import useHandleKeyCommands from './hooks/useHandleKeyCommands';
import { useTodosContext } from '../../context/todos/TodosContext';
import useForceEditorRerenderOnFilterChange from './hooks/useForceEditorRerender';
import useResolveContentBlockClassName from './hooks/useResolveContentBlockClassName';

export type OnEditorChangeHandler = (editorState: EditorState) => void;

const TodosEditor: FC = () => {
    const { editorState, setEditorState } = useTodosContext();

    // We need the editor to re-render to re-apply the styles, as these might change due
    // to changes in active filters
    useForceEditorRerenderOnFilterChange();

    const onChange: OnEditorChangeHandler = (editorState): void => {
        setEditorState(editorState);
    };

    const handleKeyCommands = useHandleKeyCommands(onChange);

    const resolveContentBlockClassName = useResolveContentBlockClassName();

    return (
        <div className="border border-gray-300 p-6 font-mono text-sm">
            <Editor
                editorState={editorState}
                onChange={onChange}
                handleKeyCommand={handleKeyCommands}
                blockStyleFn={(block) => resolveContentBlockClassName(block)}
                onTab={(event) => event.preventDefault()}
            />
        </div>
    );
};

export default TodosEditor;
