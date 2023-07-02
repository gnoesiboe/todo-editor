import { FC, MouseEventHandler } from 'react';
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

    const onClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
        // Stop propagation to prevent this from being registered as editor save somehow
        event.stopPropagation();

        await reloadOldVersion(todoList.id);
    };

    return (
        <button
            type="button"
            className="hidden group-hover:block"
            onClick={onClick}
            title="reload this version"
        >
            <Rewind size={10} />
        </button>
    );
};

export default ReloadOldVersion;
