import { FC, MouseEventHandler } from 'react';
import { useTodosContext } from '../../context/todos/TodosContext';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../infrastructure/firebase/model/TodoListDocument';
import { X } from 'react-feather';

type Props = {
    todoList: DocumentWithId<TodoListDocument>;
};

const DeleteVersion: FC<Props> = ({ todoList }) => {
    const { deleteVersion } = useTodosContext();

    const onClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
        // Stop propagation to prevent this from being registered as editor save somehow
        event.stopPropagation();

        if (!window.confirm('Are you sure you want to delete this version?')) {
            return;
        }

        await deleteVersion(todoList.id);
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className="hidden group-hover:block"
        >
            <X size={10} />
        </button>
    );
};

export default DeleteVersion;
