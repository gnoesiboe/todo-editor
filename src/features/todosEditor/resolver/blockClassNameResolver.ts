import { ContentBlock } from 'draft-js';
import { createTodoFromText } from '../../../model/TodoFactory';
import composeClassName from 'classnames';
import { todoRegex } from '../../../context/todos/TodosContext';

export function resolveBlockClassName(
    contentBlock: ContentBlock,
    hiddenProjects: string[],
    hiddenTags: string[],
): string {
    const isTodo = todoRegex.test(contentBlock.getText());

    if (isTodo) {
        const todo = createTodoFromText(contentBlock.getText());

        const isHiddenProject = todo.projects.some((project) => {
            return hiddenProjects.includes(project);
        });
        const isHiddenTag = todo.tags.some((tag) => {
            return hiddenTags.includes(tag);
        });

        return composeClassName({
            'line-through opacity-20': todo.isDone(),
            'opacity-20': isHiddenProject || isHiddenTag,
        });
    }

    return '';
}
