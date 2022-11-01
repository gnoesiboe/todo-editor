import { EditorState } from 'draft-js';
import {
    createContext,
    FC,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { createEditorDecorator } from '../../features/todosEditor/decorator/decoratorFactory';
import {
    getEditorStateFromTempStorage,
    persistEditorStateToTempStorage,
} from '../../features/todosEditor/storage/tempStorage';
import Todo from '../../model/Todo';
import { createTodoFromText, todoRegex } from '../../model/TodoFactory';

type TodosContextValue = {
    editorState: EditorState;
    forceRerender: () => void;
    todos: Todo[];
    setEditorState: (newState: SetStateAction<EditorState>) => void;
};

const TodosContext = createContext<TodosContextValue>({
    editorState: EditorState.createEmpty(),
    forceRerender: () => {},
    todos: [],
    setEditorState: () => {},
});

export const TodosProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [editorState, setEditorState] = useState(() => {
        const decorator = createEditorDecorator();

        return (
            getEditorStateFromTempStorage(decorator) ||
            EditorState.createEmpty(decorator)
        );
    });

    useEffect(() => {
        persistEditorStateToTempStorage(editorState);
    }, [editorState]);

    const contentState = editorState.getCurrentContent();

    const todos = useMemo(() => {
        const lineSeparator = '\n';

        const contentAsPlainText = contentState.getPlainText(lineSeparator);

        return contentAsPlainText
            .split(lineSeparator)
            .map((line) => {
                if (todoRegex.test(line)) {
                    return createTodoFromText(line);
                }

                return null;
            })
            .filter((todo) => !!todo) as Todo[];
    }, [contentState]);

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
        }),
        [editorState, forceRerender, todos],
    );

    return (
        <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
    );
};

export const useTodosContext = (): TodosContextValue => {
    return useContext(TodosContext);
};
