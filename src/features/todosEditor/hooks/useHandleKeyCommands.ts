import {
    DraftHandleValue,
    EditorCommand,
    EditorState,
    RichUtils,
} from 'draft-js';
import { OnEditorChangeHandler } from '../TodosEditor';

export type KeyCommandHandler = (
    command: EditorCommand,
    editorState: EditorState,
) => DraftHandleValue;

export default function useHandleKeyCommands(
    onChange: OnEditorChangeHandler,
): KeyCommandHandler {
    return (
        command: EditorCommand,
        editorState: EditorState,
    ): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onChange(newState);

            return 'handled';
        }

        return 'not-handled';
    };
}
