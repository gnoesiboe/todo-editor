import { useTodosContext } from '../../../context/todos/TodosContext';

export default function useKeyOfContentBlockThatHasFocus(): string {
    const { editorState } = useTodosContext();

    const selectionStartKey = editorState.getSelection().getStartKey();

    return editorState
        .getCurrentContent()
        .getBlockForKey(selectionStartKey)
        .getKey();
}
