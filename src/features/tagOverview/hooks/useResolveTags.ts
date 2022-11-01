import { useTodosContext } from '../../../context/todos/TodosContext';
import { extractUniqueValues } from '../../../utilities/arrayUtilities';

export default function useResolveTags() {
    const { todos } = useTodosContext();

    return extractUniqueValues(
        todos.reduce<string[]>((accumulator, currentTodo) => {
            accumulator.push(...currentTodo.tags);

            return accumulator;
        }, []),
    );
}
