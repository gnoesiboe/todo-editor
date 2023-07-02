import { FC } from 'react';
import { useTodosContext } from '../../context/todos/TodosContext';
import Version from './components/Version';
import VersionList from './components/VersionList';

const VersionsOverview: FC = () => {
    const { todoLists, currentTodoList } = useTodosContext();

    if (!todoLists || !currentTodoList) {
        return null;
    }

    return (
        <section className="space-y-2">
            <h1 className="text-l font-bold">Versions</h1>
            <VersionList>
                {todoLists.map((todoList, index) => (
                    <Version
                        key={todoList.id}
                        todoList={todoList}
                        currentTodoListUid={currentTodoList.id}
                    />
                ))}
            </VersionList>
        </section>
    );
};

export default VersionsOverview;
