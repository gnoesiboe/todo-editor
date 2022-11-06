import { KeyboardEvent } from 'react';
import { indentOnCurrentSelection } from '../../../utilities/editorStateModifiers';
import { useTodosContext } from '../../../context/todos/TodosContext';

export default function useIndentOnTab(): (event: KeyboardEvent) => void {
    const { editorState, setEditorState } = useTodosContext();

    return (event: KeyboardEvent) => {
        event.preventDefault();

        if (event.shiftKey) {
            // @todo apply reversed indent
            return;
        }

        const newEditorState = indentOnCurrentSelection(editorState);
        if (newEditorState) {
            setEditorState(newEditorState);
        }
    };
}
