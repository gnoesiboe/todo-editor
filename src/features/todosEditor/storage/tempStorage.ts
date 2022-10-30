import {
    CompositeDecorator,
    convertFromRaw,
    convertToRaw,
    EditorState,
} from 'draft-js';

const localStorageNamespace = 'state';

export function getEditorStateFromTempStorage(
    decorator: CompositeDecorator,
): EditorState | null {
    const content = localStorage.getItem(localStorageNamespace);

    if (!content) {
        return null;
    }

    return EditorState.createWithContent(
        convertFromRaw(JSON.parse(content)),
        decorator,
    );
}

export function persistEditorStateToTempStorage(
    editorState: EditorState,
): void {
    const contentState = convertToRaw(editorState.getCurrentContent());

    localStorage.setItem(localStorageNamespace, JSON.stringify(contentState));
}
