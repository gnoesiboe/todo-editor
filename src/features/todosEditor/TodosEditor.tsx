import { FC } from 'react';
import { Editor, EditorState } from 'draft-js';
import {
    useHandleKeyCommands,
    handleKeyboardShortcut,
} from './hooks/useHandleKeyCommands';
import { useTodosContext } from '../../context/todos/TodosContext';
import useForceEditorRerenderOnFilterChange from './hooks/useForceEditorRerender';
import useResolveContentBlockClassName from './hooks/useResolveContentBlockClassName';
import useIndentOnTab from './hooks/useIndentOnTab';
import './TodoEditor.css';
import Toolbar from '../toolbar/Toolbar';

export type OnEditorChangeHandler = (editorState: EditorState) => void;

const TodosEditor: FC = () => {
    const { editorState, setEditorState, isLoaded } = useTodosContext();

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
        <div className="todo-editor-container border border-gray-300 font-mono text-xs md:text-sm leading-relaxed">
            <Toolbar />
            <Editor
                editorState={editorState}
                onChange={onChange}
                handleKeyCommand={handleKeyCommands}
                blockStyleFn={(block) => resolveContentBlockClassName(block)}
                keyBindingFn={handleKeyboardShortcut}
                onTab={onTab}
                readOnly={!isLoaded}
            />
        </div>
    );
};

export default TodosEditor;
