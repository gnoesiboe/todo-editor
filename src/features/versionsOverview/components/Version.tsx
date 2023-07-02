import { FC } from 'react';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../../infrastructure/firebase/model/TodoListDocument';
import { formatAsDateTime } from '../../../utilities/dateTimeUtilities';
import { Clock } from 'react-feather';
import ReloadOldVersion from '../../reloadOldVersion/ReloadOldVersion';
import DeleteVersion from '../../deleteVersion/DeleteVersion';
import VersionName from './VersionName';

type Props = {
    todoList: DocumentWithId<TodoListDocument>;
    currentTodoListUid: string;
};

const Version: FC<Props> = ({ todoList, currentTodoListUid }) => {
    const isCurrent = todoList.id === currentTodoListUid;

    return (
        <div className="group flex gap-2 items-center justify-between text-sm">
            <div>
                <VersionName todoList={todoList} isCurrent={isCurrent} />
                <div className="flex gap-1 items-center opacity-50 text-xs">
                    <Clock size={10} />
                    {formatAsDateTime(todoList.createdAt.toDate())}
                </div>
            </div>
            <div className="flex gap-1">
                {!isCurrent && <ReloadOldVersion todoList={todoList} />}
                <DeleteVersion todoList={todoList} />
            </div>
        </div>
    );
};

export default Version;
