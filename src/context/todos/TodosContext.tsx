import { EditorState } from 'draft-js';
import {
    createContext,
    FC,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import { createEditorDecorator } from '../../features/todosEditor/decorator/decoratorFactory';
import Todo from '../../model/Todo';
import useManageHasOpenChangesState from './hooks/useManageHasOpenChangesState';
import { transformContentStateToTodoCollection } from './transformer/toTodoTransformer';
import useReloadContentFromFirestore from './hooks/useReloadContentFromFirestore';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../infrastructure/firebase/model/TodoListDocument';
import usePersistCurrentTodoList from './hooks/usePersistCurrentTodoList';
import useStartNewTodoListVersion from './hooks/useStartNewTodoListVersion';
import useReloadOldVersion from './hooks/useReloadOldVersion';
import useDeleteTodoListVersion from './hooks/useDeleteVersion';
import useSetVersionName from './hooks/useSetVersionName';

type TodosContextValue = {
    editorState: EditorState;
    forceRerender: () => void;
    todos: Todo[];
    setEditorState: (newState: SetStateAction<EditorState>) => void;
    hasOpenChanges: boolean;
    markSaved: () => void;
    isLoaded: boolean;
    currentTodoList: DocumentWithId<TodoListDocument> | null;
    todoLists: DocumentWithId<TodoListDocument>[] | null;
    isSaving: boolean;
    persistCurrentTodoList: () => Promise<void>;
    startNewTodoListVersion: () => Promise<void>;
    reloadOldVersion: (id: string) => Promise<void>;
    deleteVersion: (id: string) => Promise<void>;
    setVersionName: (id: string, name: string) => Promise<void>;
};

const TodosContext = createContext<TodosContextValue>({
    editorState: EditorState.createEmpty(),
    forceRerender: () => {},
    todos: [],
    setEditorState: () => {},
    hasOpenChanges: false,
    markSaved: () => {},
    isLoaded: false,
    currentTodoList: null,
    todoLists: null,
    isSaving: false,
    persistCurrentTodoList: () => Promise.resolve(),
    startNewTodoListVersion: () => Promise.resolve(),
    reloadOldVersion: () => Promise.resolve(),
    deleteVersion: () => Promise.resolve(),
    setVersionName: () => Promise.resolve(),
});

export const TodosProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(createEditorDecorator()),
    );

    const { isLoaded, todoLists, reloadTodoLists } =
        useReloadContentFromFirestore(setEditorState);

    const currentTodoList = todoLists?.[0] ?? null;

    const { hasOpenChanges, markSaved } =
        useManageHasOpenChangesState(editorState);

    const contentState = editorState.getCurrentContent();

    const todos = useMemo(
        () => transformContentStateToTodoCollection(contentState),
        [contentState],
    );

    const forceRerender = useCallback((): void => {
        const content = editorState.getCurrentContent();
        const newEditorState = EditorState.createWithContent(
            content,
            createEditorDecorator(),
        );

        setEditorState(newEditorState);
    }, [editorState]);

    const { isSaving, persistCurrentTodoList } = usePersistCurrentTodoList(
        editorState,
        currentTodoList,
        markSaved,
        hasOpenChanges,
    );

    const startNewTodoListVersion = useStartNewTodoListVersion(
        editorState,
        reloadTodoLists,
    );

    const reloadOldVersion = useReloadOldVersion(todoLists, reloadTodoLists);

    const deleteVersion = useDeleteTodoListVersion(reloadTodoLists);

    const setVersionName = useSetVersionName(todoLists, reloadTodoLists);

    const value: TodosContextValue = useMemo(
        () => ({
            editorState,
            todos,
            forceRerender,
            setEditorState,
            hasOpenChanges,
            markSaved,
            isLoaded,
            currentTodoList,
            todoLists,
            isSaving,
            persistCurrentTodoList,
            startNewTodoListVersion,
            reloadOldVersion,
            deleteVersion,
            setVersionName,
        }),
        [
            editorState,
            forceRerender,
            hasOpenChanges,
            isLoaded,
            markSaved,
            todos,
            currentTodoList,
            todoLists,
            isSaving,
            persistCurrentTodoList,
            startNewTodoListVersion,
            reloadOldVersion,
            deleteVersion,
            setVersionName,
        ],
    );

    return (
        <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
    );
};

export const useTodosContext = (): TodosContextValue => {
    return useContext(TodosContext);
};
