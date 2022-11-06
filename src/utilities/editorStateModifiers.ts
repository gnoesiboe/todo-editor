import { EditorState, Modifier } from 'draft-js';
import { todoRegex } from '../model/TodoFactory';

export function indentOnCurrentSelection(
    editorState: EditorState,
): EditorState | null {
    const newContentState = Modifier.insertText(
        editorState.getCurrentContent(),
        editorState.getSelection().merge({
            anchorOffset: 0,
            focusOffset: 0,
        }),
        '  ',
    );

    return EditorState.push(editorState, newContentState, 'insert-characters');
}

export function splitToNewContentBlockWithTodoPrefix(
    editorState: EditorState,
): EditorState | null {
    const currentContentState = editorState.getCurrentContent();
    const currentContentBlock = currentContentState.getBlockForKey(
        editorState.getSelection().getStartKey(),
    );

    const currentContentBlockText = currentContentBlock.getText();
    const previousIsTodo = todoRegex.test(currentContentBlockText);
    if (!previousIsTodo) {
        return null;
    }

    const indentMatch = currentContentBlockText.match(/^([ ]{0,})/);
    const indent = indentMatch ? indentMatch[1].length : 0;

    const currentSelection = editorState.getSelection();

    let newContentState = Modifier.splitBlock(
        currentContentState,
        currentSelection,
    );

    const newlyCreatedBlock = newContentState.getBlockAfter(
        currentContentBlock.getKey(),
    );

    if (!newlyCreatedBlock) {
        return null;
    }

    const textToInsert = `${' '.repeat(indent)}- [ ] `;

    newContentState = Modifier.insertText(
        newContentState,
        currentSelection.merge({
            anchorKey: newlyCreatedBlock.getKey(),
            anchorOffset: 0,
            focusKey: newlyCreatedBlock.getKey(),
            focusOffset: 0,
        }),
        textToInsert,
    );

    return EditorState.push(editorState, newContentState, 'split-block');
}
