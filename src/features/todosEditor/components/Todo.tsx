import { FC, Children } from 'react';
import composeClassName from 'classnames';
import { createTodoFromText } from '../../../model/TodoFactory';
import { ContentState } from 'draft-js';

type Props = {
    children: string;
    contentState: ContentState;
    decoratedText: string;
    blockKey: string;
    entityKey?: string;
    offsetKey: string;
    start: number;
    end: number;
};

const Todo: FC<Props> = ({ children, decoratedText }) => {
    const todo = createTodoFromText(decoratedText);

    const className = composeClassName({
        'line-through text-gray-400': todo.isDone(),
    });

    return <span className={className}>{children}</span>;
};

export default Todo;
