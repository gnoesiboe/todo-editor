import { useTodosContext } from '../../../context/todos/TodosContext';

export default function useDeterminePositionOnScreen(): DOMRect | null {
    const currentSelection = window.getSelection();

    if (!currentSelection) {
        return null;
    }

    try {
        const range = currentSelection.getRangeAt(0).cloneRange();
        range.collapse(true);

        return range.getClientRects()[0];
    } catch (error) {
        return null;
    }
}
