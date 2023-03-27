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

type TodosContextValue = {
    editorState: EditorState;
    forceRerender: () => void;
    todos: Todo[];
    setEditorState: (newState: SetStateAction<EditorState>) => void;
    hasOpenChanges: boolean;
    markSaved: () => void;
};

const TodosContext = createContext<TodosContextValue>({
    editorState: EditorState.createEmpty(),
    forceRerender: () => {},
    todos: [],
    setEditorState: () => {},
    hasOpenChanges: false,
    markSaved: () => {},
});

export const TodosProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(createEditorDecorator()),
    );

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

    const value: TodosContextValue = useMemo(
        () => ({
            editorState,
            todos,
            forceRerender,
            setEditorState,
            hasOpenChanges,
            markSaved,
        }),
        [editorState, forceRerender, hasOpenChanges, markSaved, todos],
    );

    return (
        <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
    );
};

export const useTodosContext = (): TodosContextValue => {
    return useContext(TodosContext);
};
