import { FC } from 'react';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../../infrastructure/firebase/model/TodoListDocument';
import composeClassName from 'classnames';
import { Target } from 'react-feather';

type Props = {
    todoList: DocumentWithId<TodoListDocument>;
    isCurrent: boolean;
};

const VersionName: FC<Props> = ({ todoList, isCurrent }) => {
    const className = composeClassName('relative', {
        'font-bold': isCurrent,
        italic: !todoList.name,
    });

    return (
        <div className={className}>
            {isCurrent && (
                <Target size={10} className="absolute top-1 -left-4" />
            )}
            {todoList.name || <>&#60;Unnamed list&#62;</>}
        </div>
    );
};

export default VersionName;
