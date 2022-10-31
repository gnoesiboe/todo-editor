import React, { FC } from 'react';
import './App.css';
import TodosEditor from './features/todosEditor/TodosEditor';
import { TodosProvider } from './context/todos/TodosContext';

const App: FC = () => (
    <div className="py-10 max-w-screen-lg mx-auto space-y-4">
        <h1 className="text-3xl font-bold underline">TODOS</h1>
        <TodosProvider>
            <TodosEditor />
        </TodosProvider>
    </div>
);

export default App;
