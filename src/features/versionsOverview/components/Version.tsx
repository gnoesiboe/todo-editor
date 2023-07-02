import { FC } from 'react';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../../infrastructure/firebase/model/TodoListDocument';
import { formatAsDateTime } from '../../../utilities/dateTimeUtilities';
import { Clock } from 'react-feather';
import ReloadOldVersion from '../../reloadOldVersion/ReloadOldVersion';

type Props = {
    todoList: DocumentWithId<TodoListDocument>;
    currentTodoListUid: string;
};

const Version: FC<Props> = ({ todoList, currentTodoListUid }) => {
    const isCurrent = todoList.id === currentTodoListUid;

    return (
        <div className="group flex gap-2 items-center justify-between text-sm">
            <div>
                <div>
                    {todoList.name || (
                        <span className="italic">&#60;Unnamed list&#62;</span>
                    )}
                </div>
                <div className="flex gap-1 items-center opacity-50 text-xs">
                    <Clock size={10} />
                    {formatAsDateTime(todoList.createdAt.toDate())}
                </div>
            </div>
            {isCurrent ? (
                <span className="text-xs opacity-40"> [current]</span>
            ) : (
                <ReloadOldVersion todoList={todoList} />
            )}
        </div>
    );
};

export default Version;
