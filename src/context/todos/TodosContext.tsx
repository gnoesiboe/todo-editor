import { EditorState } from 'draft-js';
import {
    createContext,
    FC,
    ReactNode,
    SetStateAction,
    useContext,
    useMemo,
    useState,
} from 'react';
import { createEditorDecorator } from '../../features/todosEditor/decorator/decoratorFactory';
import { getEditorStateFromTempStorage } from '../../features/todosEditor/storage/tempStorage';

type TodosContextValue = {
    editorState: EditorState;
    setEditorState: (newState: SetStateAction<EditorState>) => void;
};

const TodosContext = createContext<TodosContextValue>({
    editorState: EditorState.createEmpty(),
    setEditorState: () => {},
});

export const TodosProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState(() => {
        const decorator = createEditorDecorator();

        return (
            getEditorStateFromTempStorage(decorator) ||
            EditorState.createEmpty(decorator)
        );
    });

    const value: TodosContextValue = useMemo(
        () => ({
            editorState: state,
            setEditorState: setState,
        }),
        [state],
    );

    return (
        <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
    );
};

export const useTodosContext = (): TodosContextValue => {
    return useContext(TodosContext);
};
