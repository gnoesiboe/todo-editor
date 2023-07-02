import { useState, FormEventHandler, MouseEventHandler } from 'react';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../infrastructure/firebase/model/TodoListDocument';
import { useTodosContext } from '../../context/todos/TodosContext';
export default function useHandleFormState(
    todoList: DocumentWithId<TodoListDocument>,
) {
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState<string>(todoList.name || '');

    const { setVersionName } = useTodosContext();

    const onFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        // prevent submitting to backend
        event.preventDefault();

        await setVersionName(todoList.id, name);

        setIsEditing(false);
    };

    const onEditClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        setIsEditing(true);
    };

    const onCancelClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        setIsEditing(false);
    };

    const onNameChange: FormEventHandler<HTMLInputElement> = (event) => {
        const target = event.target as HTMLInputElement;

        if (target.name !== 'name') {
            return;
        }

        setName(event.currentTarget.value);
    };

    return {
        onFormSubmit,
        onEditClick,
        onCancelClick,
        onNameChange,
        isEditing,
        name,
    };
}
