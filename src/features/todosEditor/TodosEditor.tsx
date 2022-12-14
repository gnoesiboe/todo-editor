import { FC } from 'react';
import { Editor, EditorState } from 'draft-js';
import useHandleKeyCommands from './hooks/useHandleKeyCommands';
import { useTodosContext } from '../../context/todos/TodosContext';
import useForceEditorRerenderOnFilterChange from './hooks/useForceEditorRerender';
import useResolveContentBlockClassName from './hooks/useResolveContentBlockClassName';
import useIndentOnTab from './hooks/useIndentOnTab';

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

    const onTab = useIndentOnTab();

    return (
        <div className="border border-gray-300 p-6 font-mono text-sm leading-relaxed">
            <Editor
                editorState={editorState}
                onChange={onChange}
                handleKeyCommand={handleKeyCommands}
                blockStyleFn={(block) => resolveContentBlockClassName(block)}
                onTab={onTab}
            />
        </div>
    );
};

export default TodosEditor;
