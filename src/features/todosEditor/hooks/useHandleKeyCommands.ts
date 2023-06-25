import { KeyboardEvent } from 'react';
import {
    DraftHandleValue,
    EditorCommand,
    EditorState,
    RichUtils,
} from 'draft-js';
import { OnEditorChangeHandler } from '../TodosEditor';
import { useTodosContext } from '../../../context/todos/TodosContext';
import {
    splitToNewContentBlockWithTodoPrefix,
    swapCurrentLineWithAbove,
    swapCurrentLineWithBelow,
} from '../../../utilities/editorStateModifiers';

export type KeyCommandHandler = (
    command: EditorCommand,
    editorState: EditorState,
) => DraftHandleValue;

export function handleKeyboardShortcut(
    event: KeyboardEvent,
): EditorCommand | null {
    if (
        event.key === 'ArrowUp' &&
        event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey
    ) {
        return 'move-line-up';
    }

    if (
        event.key === 'ArrowDown' &&
        event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey
    ) {
        return 'move-line-down';
    }

    if (
        event.key === 'Enter' &&
        !event.shiftKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
    ) {
        return 'split-block';
    }

    return null;
}

export function useHandleKeyCommands(
    onChange: OnEditorChangeHandler,
): KeyCommandHandler {
    const { setEditorState } = useTodosContext();

    return (
        command: EditorCommand,
        editorState: EditorState,
    ): DraftHandleValue => {
        switch (command) {
            case 'split-block': {
                const newEditorState =
                    splitToNewContentBlockWithTodoPrefix(editorState);
                if (newEditorState) {
                    setEditorState(newEditorState);

                    return 'handled';
                }
                break;
            }

            case 'move-line-up': {
                const newEditorState = swapCurrentLineWithAbove(editorState);
                if (newEditorState) {
                    setEditorState(newEditorState);

                    return 'handled';
                }
                break;
            }

            case 'move-line-down':
                const newEditorState = swapCurrentLineWithBelow(editorState);
                if (newEditorState) {
                    setEditorState(newEditorState);

                    return 'handled';
                }
                break;
        }

        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);

            return 'handled';
        }

        return 'not-handled';
    };
}
