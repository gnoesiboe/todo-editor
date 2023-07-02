import { useCallback } from 'react';
import { persistNewTodoList } from '../../../infrastructure/firebase/repository/todoListRepository';
import useUserUid from '../../../hooks/useUserUid';
import { EditorState } from 'draft-js';
import { Timestamp } from 'firebase/firestore';

export default function useStartNewTodoListVersion(
    editorState: EditorState,
    reloadTodoLists: () => Promise<void>,
) {
    const userUid = useUserUid();

    const content = editorState.getCurrentContent().getPlainText('\n');

    const startNewTodoListVersion = useCallback(async () => {
        await persistNewTodoList(userUid, {
            value: content,
            createdAt: Timestamp.now(),
        });

        await reloadTodoLists();
    }, [content, reloadTodoLists, userUid]);

    return startNewTodoListVersion;
}
