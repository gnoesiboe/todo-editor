import { useCallback } from 'react';
import useUserUid from '../../../hooks/useUserUid';
import { deleteTodoList } from '../../../infrastructure/firebase/repository/todoListRepository';

export default function useDeleteVersion(reloadTodoLists: () => Promise<void>) {
    const userUid = useUserUid();

    const deleteTodoListVersion = useCallback(
        async (id: string) => {
            await deleteTodoList(userUid, id);
            await reloadTodoLists();
        },
        [reloadTodoLists, userUid],
    );

    return deleteTodoListVersion;
}
