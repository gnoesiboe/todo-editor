import { FC } from 'react';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../../infrastructure/firebase/model/TodoListDocument';
import { formatAsDateTime } from '../../../utilities/dateTimeUtilities';
import composeClassName from 'classnames';

type Props = {
    todoList: DocumentWithId<TodoListDocument>;
    currentTodoListUid: string;
};

const Version: FC<Props> = ({ todoList, currentTodoListUid }) => {
    const isCurrent = todoList.id === currentTodoListUid;

    const className = composeClassName('flex gap-2 items-center text-sm', {
        'font-bold': isCurrent,
    });

    return (
        <div className={className}>
            {formatAsDateTime(todoList.createdAt.toDate())}
            {isCurrent && (
                <span className="text-xs opacity-40"> [current]</span>
            )}
        </div>
    );
};

export default Version;
