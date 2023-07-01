import { FC, ReactNode } from 'react';
import { useTodosContext } from '../../context/todos/TodosContext';
import Version from './components/Version';

const VersionsOverview: FC = () => {
    const { todoLists, currentTodoList } = useTodosContext();

    if (!todoLists || !currentTodoList) {
        return null;
    }

    return (
        <section className="space-y-4">
            <h1 className="text-l">Versions</h1>
            <ul>
                {todoLists.map((todoList, index) => (
                    <li
                        key={todoList.id}
                        className="border-black border-opacity-10 border-t last:border-b py-1"
                    >
                        <Version
                            todoList={todoList}
                            currentTodoListUid={currentTodoList.id}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default VersionsOverview;
