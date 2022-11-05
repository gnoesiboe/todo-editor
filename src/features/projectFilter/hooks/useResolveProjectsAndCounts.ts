import { useTodosContext } from '../../../context/todos/TodosContext';

export type ProjectsAndCounts = Record<string, number>;

export default function useResolveProjectsAndCounts(): ProjectsAndCounts {
    const { todos } = useTodosContext();

    return todos.reduce<ProjectsAndCounts>((accumulator, currentTodo) => {
        currentTodo.projects.forEach((project) => {
            if (accumulator[project] === undefined) {
                accumulator[project] = 0;
            }

            accumulator[project]++;
        });

        return accumulator;
    }, {});
}
