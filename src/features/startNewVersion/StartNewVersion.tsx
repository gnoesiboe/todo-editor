import { FC } from 'react';
import { useTodosContext } from '../../context/todos/TodosContext';
import { Plus } from 'react-feather';

const StartNewVersion: FC = () => {
    const { startNewTodoListVersion } = useTodosContext();

    return (
        <button
            type="button"
            className="border border-black rounded text-xs px-1 flex items-center"
            onClick={() => startNewTodoListVersion()}
        >
            <Plus size={9} /> new
        </button>
    );
};

export default StartNewVersion;
