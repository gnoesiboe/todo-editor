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
});

export const TodosProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(createEditorDecorator()),
    );

    const { isLoaded, currentTodoList, todoLists } =
        useReloadContentFromFirestore(setEditorState);

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
        ],
    );

    return (
        <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
    );
};

export const useTodosContext = (): TodosContextValue => {
    return useContext(TodosContext);
};
