import { useTodosContext } from '../../../context/todos/TodosContext';
import { useEffect, useState } from 'react';
import { todoRegex } from '../../../model/TodoFactory';

const todoActions = ['toggleChecked' as const];
const lineActions = ['moveUp' as const, 'moveDown' as const];
const nonTodoActions = ['startTodo' as const, 'startHeader' as const];

export type ToolbarAction =
    | typeof todoActions[number]
    | typeof lineActions[number]
    | typeof nonTodoActions[number];

export const allActions: ReadonlyArray<ToolbarAction> = [
    ...lineActions,
    ...todoActions,
];

export default function useEnabledActions(): ToolbarAction[] {
    const [enabledActions, setEnabledActions] = useState<ToolbarAction[]>([]);

    const { editorState } = useTodosContext();

    useEffect(() => {
        const currentSelection = editorState.getSelection();

        if (!currentSelection.getHasFocus()) {
            // editor does not have focus

            setEnabledActions([]);

            return;
        }

        if (currentSelection.getStartKey() !== currentSelection.getEndKey()) {
            // actions are on one block (=line) only

            setEnabledActions([]);

            return;
        }

        const currentContent = editorState
            .getCurrentContent()
            .getBlockForKey(currentSelection.getStartKey())
            .getText();

        const newEnabledActions: ToolbarAction[] = [...lineActions];

        if (todoRegex.test(currentContent)) {
            newEnabledActions.push(...todoActions);
        } else {
            newEnabledActions.push(...nonTodoActions);
        }

        setEnabledActions(newEnabledActions);
    }, [editorState]);

    return enabledActions;
}
