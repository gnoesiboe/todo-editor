import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getTodoListsForUser } from '../../../infrastructure/firebase/repository/todoListRepository';
import { ContentState, EditorState } from 'draft-js';
import { createEditorDecorator } from '../../../features/todosEditor/decorator/decoratorFactory';
import useUserUid from '../../../hooks/useUserUid';
import { Logger } from '@tapraise/logger';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../../infrastructure/firebase/model/TodoListDocument';

const logger = new Logger({
    namespace: 'load',
    isEnabled: process.env.NODE_ENV !== 'production',
});

async function loadTodoListForUser(
    userUid: string,
    setEditorState: Dispatch<SetStateAction<EditorState>>,
    setIsLoaded: Dispatch<SetStateAction<boolean>>,
): Promise<DocumentWithId<TodoListDocument>> {
    setIsLoaded(false);

    const allTodoLists = await getTodoListsForUser(userUid);

    const currentTodoList = allTodoLists[0];

    let newEditorState: EditorState;
    if (currentTodoList) {
        newEditorState = EditorState.createWithContent(
            ContentState.createFromText(currentTodoList.value, '\n'),
            createEditorDecorator(),
        );
    } else {
        newEditorState = EditorState.createEmpty(createEditorDecorator());
    }

    setEditorState(newEditorState);

    setIsLoaded(true);

    return currentTodoList;
}

type Output = {
    isLoaded: boolean;
    currentTodoList: DocumentWithId<TodoListDocument> | null;
};

export default function useReloadContentFromFirestore(
    setEditorState: Dispatch<SetStateAction<EditorState>>,
): Output {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [currentTodoList, setCurrentTodoList] =
        useState<DocumentWithId<TodoListDocument> | null>(null);

    const userUid = useUserUid();

    useEffect(() => {
        logger.info(`on user change (${userUid})`);

        loadTodoListForUser(userUid, setEditorState, setIsLoaded).then(
            (currentTodoList) => {
                setCurrentTodoList(currentTodoList);
            },
        );
    }, [setEditorState, userUid]);

    useEffect(() => {
        const onWindowFocus = () => {
            logger.info('on window focus');

            loadTodoListForUser(userUid, setEditorState, setIsLoaded).then(
                (currentTodoList) => {
                    setCurrentTodoList(currentTodoList);
                },
            );
        };

        window.addEventListener('focus', onWindowFocus);

        return () => window.removeEventListener('focus', onWindowFocus);
    }, [setEditorState, userUid]);

    return { isLoaded, currentTodoList };
}
