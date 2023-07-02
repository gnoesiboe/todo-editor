import { FC } from 'react';
import { useTodosContext } from '../../context/todos/TodosContext';

const StartNewVersion: FC = () => {
    const { startNewTodoListVersion } = useTodosContext();

    return (
        <button
            type="button"
            className="border border-black rounded text-xs px-1"
            onClick={() => startNewTodoListVersion()}
        >
            new
        </button>
    );
};

export default StartNewVersion;
