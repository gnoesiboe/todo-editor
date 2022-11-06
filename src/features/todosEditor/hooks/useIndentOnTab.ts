import { KeyboardEvent } from 'react';
import {
    indentOnCurrentSelection,
    negativeIndentOnCurrentSelection,
} from '../../../utilities/editorStateModifiers';
import { useTodosContext } from '../../../context/todos/TodosContext';

export default function useIndentOnTab(): (event: KeyboardEvent) => void {
    const { editorState, setEditorState } = useTodosContext();

    return (event: KeyboardEvent) => {
        event.preventDefault();

        const newEditorState = event.shiftKey
            ? negativeIndentOnCurrentSelection(editorState)
            : indentOnCurrentSelection(editorState);

        setEditorState(newEditorState);
    };
}
