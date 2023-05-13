import React, { FC } from 'react';
import './App.css';
import TodosEditor from './features/todosEditor/TodosEditor';
import { TodosProvider } from './context/todos/TodosContext';
import ProjectFilter from './features/projectFilter/ProjectFilter';
import TagFilter from './features/tagFilter/TagFilter';
import { FilterProvider } from './context/filter/FilterContext';
import SaveFile from './features/saveFile/SaveFile';
import AppHeading from './features/appHeading/AppHeading';
import UsageInformation from './features/usageInformation/UsageInformation';
import StartPeriodFilter from './features/startPeriodFilter/StartPeriodFilter';

const App: FC = () => (
    <div className="py-10 max-w-screen-xl mx-auto space-y-6 p-2">
        <TodosProvider>
            <AppHeading />
            <FilterProvider>
                <div className="flex flex-col md:flex-row-reverse gap-4 items-start">
                    <div className="bg-amber-200 w-full md:w-3/12 p-6 space-y-8">
                        <SaveFile />
                        <ProjectFilter />
                        <TagFilter />
                        <StartPeriodFilter />
                    </div>
                    <div className="w-full md:w-9/12 space-y-6">
                        <TodosEditor />
                        <UsageInformation />
                    </div>
                </div>
            </FilterProvider>
        </TodosProvider>
    </div>
);

export default App;
