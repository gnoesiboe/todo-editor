import { useTodosContext } from '../../../context/todos/TodosContext';

type TagsAndCounts = Record<string, number>;

export default function useResolveTags(): TagsAndCounts {
    const { todos } = useTodosContext();

    return todos.reduce<TagsAndCounts>((accumulator, currentTodo) => {
        currentTodo.tags.forEach((tag) => {
            if (accumulator[tag] === undefined) {
                accumulator[tag] = 0;
            }
            accumulator[tag]++;
        });

        return accumulator;
    }, {});
}
