import { EditorState } from 'draft-js';
import {
    createContext,
    FC,
    ReactNode,
    SetStateAction,
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

type TodosContextValue = {
    editorState: EditorState;
    plainTextEditorState: string;
    setEditorState: (newState: SetStateAction<EditorState>) => void;
};

const TodosContext = createContext<TodosContextValue>({
    editorState: EditorState.createEmpty(),
    plainTextEditorState: '',
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

    const plainTextEditorState = useMemo(() => {
        return contentState.getPlainText('\n');
    }, [contentState]);

    const value: TodosContextValue = useMemo(
        () => ({ editorState, plainTextEditorState, setEditorState }),
        [editorState, plainTextEditorState],
    );

    return (
        <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
    );
};

export const useTodosContext = (): TodosContextValue => {
    return useContext(TodosContext);
};
