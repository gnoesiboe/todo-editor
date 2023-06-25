import { useFilterContext } from '../../../context/filter/FilterContext';
import { ContentBlock } from 'draft-js';
import { createTodoFromText, todoRegex } from '../../../model/TodoFactory';
import composeClassName from 'classnames';
import Todo from '../../../model/Todo';
import { noTagsKey } from '../../../hooks/useResolveTagsAndCounts';
import { noProjectsKey } from '../../projectFilter/hooks/useResolveProjectsAndCounts';
import {
    allStartPeriods as allDeadlinePeriods,
    StartPeriod,
} from '../../startPeriodFilter/hooks/useResolveStartPeriodsAndCounts';
import { endOfDay, endOfISOWeek, endOfMonth } from 'date-fns';
import { DeadlinePeriod } from '../../deadlinePeriodFilter/hooks/useResolveDeadlinePeriodsAndCounts';

function determineTodoHasHiddenTag(todo: Todo, hiddenTags: string[]): boolean {
    if (hiddenTags.length === 0) {
        return false;
    }

    if (todo.tags.length === 0) {
        return hiddenTags.includes(noTagsKey);
    }

    return todo.tags.every((tag) => {
        return hiddenTags.includes(tag);
    });
}

function determineTodoHasHiddenProject(
    todo: Todo,
    hiddenProjects: string[],
): boolean {
    if (hiddenProjects.length === 0) {
        return false;
    }

    if (todo.projects.length === 0) {
        return hiddenProjects.includes(noProjectsKey);
    }

    return todo.projects.every((project) => {
        return hiddenProjects.includes(project);
    });
}

function determineTodoIsInHiddenStartPeriod(
    todo: Todo,
    hiddenStartPeriods: StartPeriod[],
): boolean {
    const visibleStartPeriod = allDeadlinePeriods.find((cursorStartPeriod) => {
        return !hiddenStartPeriods.includes(cursorStartPeriod);
    });

    if (!visibleStartPeriod) {
        throw new Error('Should not get to this point');
    }

    if (!todo.startsAt) {
        return false;
    }

    const now = new Date();

    switch (visibleStartPeriod) {
        case 'today or before': {
            const endOfToday = endOfDay(now);
            return todo.startsAt > endOfToday;
        }

        case 'this week': {
            const endOfCurrentWeek = endOfISOWeek(now);
            return todo.startsAt > endOfCurrentWeek;
        }

        case 'this month': {
            const endOfCurrentMonth = endOfMonth(now);
            return todo.startsAt > endOfCurrentMonth;
        }

        case 'whenever': {
            return false;
        }

        default:
            throw new Error(`Unknown start period: '${visibleStartPeriod}'`);
    }
}

function determineTodoIsInHiddenDeadlinePeriod(
    todo: Todo,
    hiddenDeadlinePeriods: DeadlinePeriod[],
): boolean {
    const visibleDeadlinePeriod = allDeadlinePeriods.find(
        (cursorDeadlinePeriod) => {
            return !hiddenDeadlinePeriods.includes(cursorDeadlinePeriod);
        },
    );

    if (!visibleDeadlinePeriod) {
        throw new Error('Should not get to this point');
    }

    if (!todo.deadline && visibleDeadlinePeriod !== 'whenever') {
        return true;
    }

    const now = new Date();

    switch (visibleDeadlinePeriod) {
        case 'today or before': {
            return !!todo.deadline && todo.deadline > now;
        }

        case 'this week': {
            const endOfCurrentWeek = endOfISOWeek(now);
            return !!todo.deadline && todo.deadline > endOfCurrentWeek;
        }

        case 'this month': {
            const endOfCurrentMonth = endOfMonth(now);
            return !!todo.deadline && todo.deadline > endOfCurrentMonth;
        }

        case 'whenever': {
            return false;
        }

        default:
            throw new Error(
                `Unknown deadline period: '${visibleDeadlinePeriod}'`,
            );
    }
}

export default function useResolveContentBlockClassName() {
    const {
        hiddenProjects,
        hiddenTags,
        hiddenStartPeriods,
        hiddenDeadlinePeriods,
    } = useFilterContext();

    return (contentBlock: ContentBlock): string => {
        const isTodo = todoRegex.test(contentBlock.getText());

        if (!isTodo) {
            return '';
        }

        const todo = createTodoFromText(contentBlock.getText());

        const muted =
            todo.isDone() ||
            todo.isAbandoned() ||
            determineTodoHasHiddenProject(todo, hiddenProjects) ||
            determineTodoHasHiddenTag(todo, hiddenTags) ||
            determineTodoIsInHiddenStartPeriod(todo, hiddenStartPeriods) ||
            determineTodoIsInHiddenDeadlinePeriod(todo, hiddenDeadlinePeriods);

        return composeClassName({
            'opacity-20': muted,
        });
    };
}
