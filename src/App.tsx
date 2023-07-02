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
import DeadlinePeriodFilter from './features/deadlinePeriodFilter/DeadlinePeriodFilter';
import CollapsibleSidebar from './primitives/CollapsibleSidebar';
import VersionsOverview from './features/versionsOverview/VersionsOverview';

const App: FC = () => (
    <div className="py-10 max-w-screen-xl mx-auto space-y-6 p-2">
        <TodosProvider>
            <AppHeading />
            <FilterProvider>
                <div className="flex flex-col md:flex-row-reverse gap-4 items-start">
                    <div className="w-full md:w-3/12 space-y-4">
                        <CollapsibleSidebar>
                            <ProjectFilter />
                            <TagFilter />
                            <StartPeriodFilter />
                            <DeadlinePeriodFilter />
                            <hr className="mx-20 border-t border-black border-opacity-10" />
                            <VersionsOverview />
                        </CollapsibleSidebar>
                        <SaveFile />
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
