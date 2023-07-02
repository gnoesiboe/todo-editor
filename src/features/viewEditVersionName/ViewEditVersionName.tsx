import { FC } from 'react';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../infrastructure/firebase/model/TodoListDocument';
import composeClassName from 'classnames';
import { Target, Edit3 } from 'react-feather';
import useHandleFormState from './useHandleFormState';

type Props = {
    todoList: DocumentWithId<TodoListDocument>;
    isCurrent: boolean;
};

const ViewEditVersionName: FC<Props> = ({ todoList, isCurrent }) => {
    const {
        onFormSubmit,
        onEditClick,
        onCancelClick,
        onNameChange,
        isEditing,
        name,
    } = useHandleFormState(todoList);

    const className = composeClassName(
        'flex items-center justify-start gap-1 relative',
        {
            'font-bold': isCurrent,
            italic: !todoList.name,
        },
    );

    return (
        <div className={className}>
            {isCurrent && (
                <Target size={10} className="absolute top-1 -left-4" />
            )}
            {isEditing ? (
                <form onSubmit={onFormSubmit} className="space-y-2 mb-4">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        aria-label="Name"
                        className="p-1 w-40"
                        value={name}
                        onChange={onNameChange}
                        autoFocus
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="submit"
                            className="border border-black px-1 rounded"
                        >
                            save
                        </button>
                        <button
                            type="button"
                            className="border border-black px-1 rounded"
                            onClick={onCancelClick}
                        >
                            cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    {todoList.name || <>&#60;Unnamed list&#62;</>}
                    <button type="button" onClick={onEditClick}>
                        <Edit3 size={10} />
                    </button>
                </>
            )}
        </div>
    );
};

export default ViewEditVersionName;
