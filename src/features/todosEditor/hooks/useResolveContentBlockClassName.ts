import { useFilterContext } from '../../../context/filter/FilterContext';
import { ContentBlock } from 'draft-js';
import { createTodoFromText, todoRegex } from '../../../model/TodoFactory';
import composeClassName from 'classnames';
import Todo from '../../../model/Todo';
import { noTagsKey } from '../../../hooks/useResolveTagsAndCounts';
import { noProjectsKey } from '../../projectFilter/hooks/useResolveProjectsAndCounts';
import {
    allStartPeriods,
    StartPeriod,
} from '../../startPeriodFilter/useResolveStartPeriodsAndCounts';
import { endOfDay, endOfISOWeek, endOfMonth } from 'date-fns';

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
    const visibleStartPeriod = allStartPeriods.find((cursorStartPeriod) => {
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

export default function useResolveContentBlockClassName() {
    const { hiddenProjects, hiddenTags, hiddenStartPeriods } =
        useFilterContext();

    return (contentBlock: ContentBlock): string => {
        const isTodo = todoRegex.test(contentBlock.getText());

        if (!isTodo) {
            return '';
        }

        const todo = createTodoFromText(contentBlock.getText());

        const isHiddenProject = determineTodoHasHiddenProject(
            todo,
            hiddenProjects,
        );
        const isHiddenTag = determineTodoHasHiddenTag(todo, hiddenTags);
        const isInHiddenStartPeriod = determineTodoIsInHiddenStartPeriod(
            todo,
            hiddenStartPeriods,
        );

        const muted =
            todo.isDone() ||
            todo.isAbandoned() ||
            isHiddenProject ||
            isHiddenTag ||
            isInHiddenStartPeriod;

        return composeClassName({
            'opacity-20': muted,
        });
    };
}
