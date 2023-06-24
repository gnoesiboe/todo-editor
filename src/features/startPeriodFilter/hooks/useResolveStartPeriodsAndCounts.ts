import { useTodosContext } from '../../../context/todos/TodosContext';
import { endOfMonth, endOfISOWeek, isToday } from 'date-fns';

export type StartPeriod =
    | 'today or before'
    | 'this week'
    | 'this month'
    | 'whenever';

export const allStartPeriods: StartPeriod[] = [
    'today or before',
    'this week',
    'this month',
    'whenever',
];

export type StartPeriodAndCounts = Record<StartPeriod, number>;

export default function useResolveStartPeriodsAndCounts() {
    const { todos } = useTodosContext();

    return todos.reduce<StartPeriodAndCounts>(
        (accumulator, currentTodo) => {
            const now = new Date();

            if (!currentTodo.startsAt || isToday(currentTodo.startsAt)) {
                accumulator['today or before'] += 1;
            }

            const endOfCurrentWeek = endOfISOWeek(now);
            if (
                !currentTodo.startsAt ||
                currentTodo.startsAt <= endOfCurrentWeek
            ) {
                accumulator['this week'] += 1;
            }

            const endOfCurrentMonth = endOfMonth(now);
            if (
                !currentTodo.startsAt ||
                currentTodo.startsAt <= endOfCurrentMonth
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
