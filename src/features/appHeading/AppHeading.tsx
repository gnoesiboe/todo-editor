import React, { FC } from 'react';
import { useTodosContext } from '../../context/todos/TodosContext';
import Logout from '../logout/Logout';

const AppHeading: FC = () => {
    const { hasOpenChanges } = useTodosContext();

    return (
        <div className="flex justify-between">
            <h1 className="text-3xl font-bold">TODO</h1>
            {hasOpenChanges && (
                <div
                    className="ml-2"
                    title="There are changes that have not been saved"
                >
                    *
                </div>
            )}
            <Logout />
        </div>
    );
};

export default AppHeading;
