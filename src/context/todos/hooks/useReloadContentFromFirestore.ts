import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getTodoListForUser } from '../../../infrastructure/firebase/repository/todoListRepository';
import { ContentState, EditorState } from 'draft-js';
import { createEditorDecorator } from '../../../features/todosEditor/decorator/decoratorFactory';
import useUserUid from '../../../hooks/useUserUid';
import { Logger } from '@tapraise/logger';

const logger = new Logger({
    namespace: 'load',
    isEnabled: process.env.NODE_ENV !== 'production',
});

async function loadTodoListForUser(
    userUid: string,
    setEditorState: Dispatch<SetStateAction<EditorState>>,
    setIsLoaded: Dispatch<SetStateAction<boolean>>,
): Promise<void> {
    setIsLoaded(false);

    const data = await getTodoListForUser(userUid);

    let newEditorState: EditorState;
    if (data) {
        newEditorState = EditorState.createWithContent(
            ContentState.createFromText(data.value, '\n'),
            createEditorDecorator(),
        );
    } else {
        newEditorState = EditorState.createEmpty(createEditorDecorator());
    }

    setEditorState(newEditorState);

    setIsLoaded(true);
}

export default function useReloadContentFromFirestore(
    setEditorState: Dispatch<SetStateAction<EditorState>>,
): boolean {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const userUid = useUserUid();

    useEffect(() => {
        logger.info(`on user change (${userUid})`);

        // noinspection JSIgnoredPromiseFromCall
        loadTodoListForUser(userUid, setEditorState, setIsLoaded);
    }, [setEditorState, userUid]);

    useEffect(() => {
        const onWindowFocus = () => {
            logger.info('on window focus');

            // noinspection JSIgnoredPromiseFromCall
            loadTodoListForUser(userUid, setEditorState, setIsLoaded);
        };

        window.addEventListener('focus', onWindowFocus);

        return () => window.removeEventListener('focus', onWindowFocus);
    }, [setEditorState, userUid]);

    return isLoaded;
}
