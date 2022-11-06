import {
    DraftHandleValue,
    EditorCommand,
    EditorState,
    RichUtils,
} from 'draft-js';
import { OnEditorChangeHandler } from '../TodosEditor';
import { useTodosContext } from '../../../context/todos/TodosContext';
import { splitToNewContentBlockWithTodoPrefix } from '../../../utilities/editorStateModifiers';

export type KeyCommandHandler = (
    command: EditorCommand,
    editorState: EditorState,
) => DraftHandleValue;

export default function useHandleKeyCommands(
    onChange: OnEditorChangeHandler,
): KeyCommandHandler {
    const { setEditorState } = useTodosContext();

    return (
        command: EditorCommand,
        editorState: EditorState,
    ): DraftHandleValue => {
        if (command === 'split-block') {
            const newEditorState =
                splitToNewContentBlockWithTodoPrefix(editorState);

            if (newEditorState) {
                setEditorState(newEditorState);

                return 'handled';
            }
        }

        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onChange(newState);

            return 'handled';
        }

        return 'not-handled';
    };
}
