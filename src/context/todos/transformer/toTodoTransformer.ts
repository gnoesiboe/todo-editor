import Todo from '../../../model/Todo';
import { createTodoFromText, todoRegex } from '../../../model/TodoFactory';
import { ContentState } from 'draft-js';

const lineSeparator = '\n';

export function transformContentStateToTodoCollection(
    contentState: ContentState,
): Todo[] {
    const contentAsPlainText = contentState.getPlainText(lineSeparator);

    return contentAsPlainText
        .split(lineSeparator)
        .map((line) => {
            if (todoRegex.test(line)) {
                return createTodoFromText(line);
            }

            return null;
        })
        .filter((todo) => !!todo) as Todo[];
}
