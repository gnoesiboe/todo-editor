import { useTodosContext } from '../context/todos/TodosContext';

export const noTagsKey = '_noTags' as const;

type TagsAndCounts = Record<string, number> & { [noTagsKey]: number };

export default function useResolveTagsAndCounts(): TagsAndCounts {
    const { todos } = useTodosContext();

    return todos.reduce<TagsAndCounts>(
        (accumulator, currentTodo) => {
            if (currentTodo.tags.length === 0) {
                accumulator[noTagsKey] += 1;

                return accumulator;
            }

            currentTodo.tags.forEach((tag) => {
                if (accumulator[tag] === undefined) {
                    accumulator[tag] = 0;
                }

                accumulator[tag]++;
            });

            return accumulator;
        },
        {
            [noTagsKey]: 0,
        },
    );
}
