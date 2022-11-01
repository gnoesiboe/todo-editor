import React, { FC } from 'react';
import './App.css';
import TodosEditor from './features/todosEditor/TodosEditor';
import { TodosProvider } from './context/todos/TodosContext';
import ProjectOverview from './features/projectOverview/ProjectOverview';
import TagOverview from './features/tagOverview/TagOverview';
import { FilterProvider } from './context/filter/FilterContext';

const App: FC = () => (
    <div className="py-10 max-w-screen-lg mx-auto space-y-4">
        <h1 className="text-3xl font-bold underline">TODOS</h1>
        <TodosProvider>
            <FilterProvider>
                <div className="flex flex-col md:flex-row-reverse gap-4">
                    <div className="bg-amber-200 w-full md:w-3/12 p-4 space-y-4">
                        <ProjectOverview />
                        <TagOverview />
                    </div>
                    <div className="w-full md:w-9/12">
                        <TodosEditor />
                    </div>
                </div>
            </FilterProvider>
        </TodosProvider>
    </div>
);

export default App;
