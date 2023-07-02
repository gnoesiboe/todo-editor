import { FC } from 'react';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../infrastructure/firebase/model/TodoListDocument';
import { useTodosContext } from '../../context/todos/TodosContext';

type Props = {
    todoList: DocumentWithId<TodoListDocument>;
};

const ReloadOldVersion: FC<Props> = ({ todoList }) => {
    const { reloadOldVersion } = useTodosContext();

    return (
        <button
            type="button"
            className="text-xs hover:underline hidden group-hover:block"
            onClick={() => {
                reloadOldVersion(todoList.id);
            }}
        >
            reload
        </button>
    );
};

export default ReloadOldVersion;
