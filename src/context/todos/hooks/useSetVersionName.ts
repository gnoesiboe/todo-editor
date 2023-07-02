import { useCallback } from 'react';
import useUserUid from '../../../hooks/useUserUid';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../../infrastructure/firebase/model/TodoListDocument';
import { persistExistingTodoList } from '../../../infrastructure/firebase/repository/todoListRepository';

export default function useSetVersionName(
    todoLists: DocumentWithId<TodoListDocument>[] | null,
    reloadTodoLists: () => Promise<void>,
) {
    const userUid = useUserUid();

    const setVersionName = useCallback(
        async (id: string, name: string) => {
            const todoListToUpdate = todoLists?.find(
                (todoList) => todoList.id === id,
            );

            if (!todoListToUpdate) {
                return;
            }

            await persistExistingTodoList(userUid, {
                ...todoListToUpdate,
                name,
            });

            await reloadTodoLists();
        },
        [reloadTodoLists, todoLists, userUid],
    );

    return setVersionName;
}
