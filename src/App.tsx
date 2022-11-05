import React, { FC } from 'react';
import './App.css';
import TodosEditor from './features/todosEditor/TodosEditor';
import { TodosProvider } from './context/todos/TodosContext';
import ProjectFilter from './features/projectFilter/ProjectFilter';
import TagFilter from './features/tagFilter/TagFilter';
import { FilterProvider } from './context/filter/FilterContext';
import LoadAndSaveFile from './features/loadFile/LoadAndSaveFile';
import AppHeading from './features/appHeading/AppHeading';

const App: FC = () => (
    <TodosProvider>
        <div className="py-10 max-w-screen-xl mx-auto space-y-6">
            <AppHeading />
            <FilterProvider>
                <div className="flex flex-col md:flex-row-reverse gap-4 items-start">
                    <div className="bg-amber-200 w-full md:w-3/12 p-6 space-y-8">
                        <LoadAndSaveFile />
                        <ProjectFilter />
                        <TagFilter />
                    </div>
                    <div className="w-full md:w-9/12">
                        <TodosEditor />
                    </div>
                </div>
            </FilterProvider>
        </div>
    </TodosProvider>
);

export default App;
