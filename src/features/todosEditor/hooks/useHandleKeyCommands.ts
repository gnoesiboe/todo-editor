import { KeyboardEvent } from 'react';
import {
    DraftHandleValue,
    EditorCommand,
    EditorState,
    RichUtils,
    getDefaultKeyBinding,
} from 'draft-js';
import { OnEditorChangeHandler } from '../TodosEditor';
import { useTodosContext } from '../../../context/todos/TodosContext';
import {
    splitToNewContentBlockWithTodoPrefix,
    swapCurrentLineWithAbove,
    swapCurrentLineWithBelow,
    toggleTodoStatus,
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
        event.key === ' ' &&
        event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        !event.shiftKey
    ) {
        return 'toggle-todo-status';
    }

    return getDefaultKeyBinding(event);
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

            case 'move-line-down': {
                const newEditorState = swapCurrentLineWithBelow(editorState);
                if (newEditorState) {
                    setEditorState(newEditorState);

                    return 'handled';
                }
                break;
            }

            case 'toggle-todo-status': {
                const newEditorState = toggleTodoStatus(editorState);
                if (newEditorState) {
                    setEditorState(newEditorState);

                    return 'handled';
                }
                break;
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
