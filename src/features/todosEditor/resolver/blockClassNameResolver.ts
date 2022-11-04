import { ContentBlock } from 'draft-js';
import { createTodoFromText, todoRegex } from '../../../model/TodoFactory';
import composeClassName from 'classnames';

export function resolveBlockClassName(
    contentBlock: ContentBlock,
    hiddenProjects: string[],
    hiddenTags: string[],
): string {
    const isTodo = todoRegex.test(contentBlock.getText());

    if (!isTodo) {
        return '';
    }

    const todo = createTodoFromText(contentBlock.getText());

    const isHiddenProject = todo.projects.some((project) => {
        return hiddenProjects.includes(project);
    });
    const isHiddenTag = todo.tags.some((tag) => {
        return hiddenTags.includes(tag);
    });

    const muted =
        todo.isDone() || todo.isAbandoned() || isHiddenProject || isHiddenTag;

    return composeClassName({
        'opacity-20': muted,
    });
}
