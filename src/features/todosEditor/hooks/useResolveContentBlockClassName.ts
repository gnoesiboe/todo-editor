import { useFilterContext } from '../../../context/filter/FilterContext';
import { ContentBlock } from 'draft-js';
import { createTodoFromText, todoRegex } from '../../../model/TodoFactory';
import composeClassName from 'classnames';
import Todo from '../../../model/Todo';
import { noTagsKey } from '../../../hooks/useResolveTagsAndCounts';
import { noProjectsKey } from '../../projectFilter/hooks/useResolveProjectsAndCounts';

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

export default function useResolveContentBlockClassName() {
    const { hiddenProjects, hiddenTags } = useFilterContext();

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

        const muted =
            todo.isDone() ||
            todo.isAbandoned() ||
            isHiddenProject ||
            isHiddenTag;

        return composeClassName({
            'opacity-20': muted,
        });
    };
}
