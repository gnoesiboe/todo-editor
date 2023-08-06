import { ToolbarAction } from './useEnabledActions';
import { useCallback } from 'react';
import { ToolbarActionClickHandler } from '../components/ToolbarItem';
import { useTodosContext } from '../../../context/todos/TodosContext';
import {
    addTodoPrefix,
    swapCurrentLineWithAbove,
    swapCurrentLineWithBelow,
    toggleTodoStatus,
} from '../../../utilities/editorStateModifiers';

export default function useHandleActionClick(): ToolbarActionClickHandler {
    const { editorState, setEditorState } = useTodosContext();

    return useCallback(
        (action: ToolbarAction) => {
            switch (action) {
                case 'toggleChecked': {
                    const newEditorState = toggleTodoStatus(editorState);
                    if (newEditorState) {
                        setEditorState(newEditorState);
                    }
                    break;
                }

                case 'moveUp': {
                    const newEditorState =
                        swapCurrentLineWithAbove(editorState);
                    if (newEditorState) {
                        setEditorState(newEditorState);
                    }
                    break;
                }

                case 'moveDown': {
                    const newEditorState =
                        swapCurrentLineWithBelow(editorState);
                    if (newEditorState) {
                        setEditorState(newEditorState);
                    }
                    break;
                }

                case 'startTodo': {
                    const newEditorState = addTodoPrefix(editorState);
                    if (newEditorState) {
                        setEditorState(newEditorState);
                    }
                    break;
                }

                default:
                    throw new Error(`Unsupported action: ${action}`);
            }
        },
        [editorState, setEditorState],
    );
}
