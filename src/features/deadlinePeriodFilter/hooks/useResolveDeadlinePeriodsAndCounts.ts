import { endOfISOWeek, endOfMonth, isToday } from 'date-fns';
import { useTodosContext } from '../../../context/todos/TodosContext';

export type DeadlinePeriod =
    | 'today or before'
    | 'this week'
    | 'this month'
    | 'whenever';

export const allDeadlinePeriods: DeadlinePeriod[] = [
    'today or before',
    'this week',
    'this month',
    'whenever',
];

export type DeadlinePeriodAndCounts = Record<DeadlinePeriod, number>;

export default function useResolveDeadlinePeriodsAndCounts() {
    const { todos } = useTodosContext();

    return todos.reduce<DeadlinePeriodAndCounts>(
        (accumulator, currentTodo) => {
            const now = new Date();

            if (currentTodo.deadline && isToday(currentTodo.deadline)) {
                accumulator['today or before'] += 1;
            }

            const endOfCurrentWeek = endOfISOWeek(now);
            if (
                !currentTodo.deadline ||
                currentTodo.deadline <= endOfCurrentWeek
            ) {
                accumulator['this week'] += 1;
            }

            const endOfCurrentMonth = endOfMonth(now);
            if (
                !currentTodo.deadline ||
                currentTodo.deadline <= endOfCurrentMonth
            ) {
                accumulator['this month'] += 1;
            }

            accumulator['whenever'] += 1;

            return accumulator;
        },
        {
            'today or before': 0,
            'this week': 0,
            'this month': 0,
            whenever: 0,
        },
    );
}
