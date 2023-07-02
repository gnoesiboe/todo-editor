import { useCallback } from 'react';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../../infrastructure/firebase/model/TodoListDocument';
import { persistNewTodoList } from '../../../infrastructure/firebase/repository/todoListRepository';
import useUserUid from '../../../hooks/useUserUid';
import { Timestamp } from 'firebase/firestore';

export default function useReloadOldVersion(
    todoLists: DocumentWithId<TodoListDocument>[] | null,
    reloadTodoLists: () => Promise<void>,
) {
    const userUid = useUserUid();

    const reloadOldVersion = useCallback(
        async (id: string) => {
            const todoListToReload = todoLists?.find(
                (todoList) => todoList.id === id,
            );

            if (!todoListToReload) {
                return;
            }

            const newTodoList: TodoListDocument = {
                value: todoListToReload.value,
                createdAt: Timestamp.now(),
            };

            if (todoListToReload.name) {
                newTodoList.name = todoListToReload.name;
            }

            await persistNewTodoList(userUid, newTodoList);

            await reloadTodoLists();
        },
        [reloadTodoLists, todoLists, userUid],
    );

    return reloadOldVersion;
}
