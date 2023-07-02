import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';
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
): Promise<DocumentWithId<TodoListDocument>[]> {
    setIsLoaded(false);

    const todoLists = await getTodoListsForUser(userUid);

    const currentTodoList = todoLists[0];

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

    return todoLists;
}

type Output = {
    isLoaded: boolean;
    todoLists: DocumentWithId<TodoListDocument>[] | null;
    reloadTodoLists: () => Promise<void>;
};

export default function useReloadContentFromFirestore(
    setEditorState: Dispatch<SetStateAction<EditorState>>,
): Output {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [todoLists, setTodoLists] = useState<
        DocumentWithId<TodoListDocument>[] | null
    >(null);

    const userUid = useUserUid();

    useEffect(() => {
        logger.info(`on user change (${userUid})`);

        loadTodoListForUser(userUid, setEditorState, setIsLoaded).then(
            (todoLists) => {
                setTodoLists(todoLists);
            },
        );
    }, [setEditorState, userUid]);

    useEffect(() => {
        const onWindowFocus = () => {
            logger.info('on window focus');

            loadTodoListForUser(userUid, setEditorState, setIsLoaded).then(
                (todoLists) => {
                    setTodoLists(todoLists);
                },
            );
        };

        window.addEventListener('focus', onWindowFocus);

        return () => window.removeEventListener('focus', onWindowFocus);
    }, [setEditorState, userUid]);

    const reloadTodoLists = useCallback(async () => {
        logger.info('force reload todo lists');

        const todoLists = await loadTodoListForUser(
            userUid,
            setEditorState,
            setIsLoaded,
        );

        setTodoLists(todoLists);
    }, [setEditorState, userUid]);

    return { isLoaded, todoLists, reloadTodoLists };
}
