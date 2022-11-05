import React, { FC } from 'react';
import { useTodosContext } from '../../context/todos/TodosContext';

const AppHeading: FC = () => {
    const { hasOpenChanges } = useTodosContext();

    return (
        <div className="flex">
            <h1 className="text-3xl font-bold underline">TODOS</h1>
            {hasOpenChanges && (
                <div
                    className="ml-2"
                    title="There are changes that have not been saved"
                >
                    *
                </div>
            )}
        </div>
    );
};

export default AppHeading;
