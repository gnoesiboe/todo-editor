import { useTodosContext } from '../../../context/todos/TodosContext';

export const noProjectsKey = '_noProjects' as const;

export type ProjectsAndCounts = Record<string, number> & {
    [noProjectsKey]: number;
};

export default function useResolveProjectsAndCounts(): ProjectsAndCounts {
    const { todos } = useTodosContext();

    return todos.reduce<ProjectsAndCounts>(
        (accumulator, currentTodo) => {
            if (currentTodo.projects.length === 0) {
                accumulator[noProjectsKey] += 1;

                return accumulator;
            }

            currentTodo.projects.forEach((project) => {
                if (accumulator[project] === undefined) {
                    accumulator[project] = 0;
                }

                accumulator[project]++;
            });

            return accumulator;
        },
        {
            [noProjectsKey]: 0,
        },
    );
}
