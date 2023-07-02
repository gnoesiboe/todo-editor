import { FC } from 'react';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../infrastructure/firebase/model/TodoListDocument';
import { useTodosContext } from '../../context/todos/TodosContext';
import { Rewind } from 'react-feather';

type Props = {
    todoList: DocumentWithId<TodoListDocument>;
};

const ReloadOldVersion: FC<Props> = ({ todoList }) => {
    const { reloadOldVersion } = useTodosContext();

    return (
        <button
            type="button"
            className="hidden group-hover:block"
            onClick={() => {
                reloadOldVersion(todoList.id);
            }}
            title="reload this version"
        >
            <Rewind size={10} />
        </button>
    );
};

export default ReloadOldVersion;
