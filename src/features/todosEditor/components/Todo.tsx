import { FC, Children } from 'react';
import composeClassName from 'classnames';
import { createTodoFromText } from '../../../model/TodoFactory';

type Props = {
    children: string;
};

const Todo: FC<Props> = ({ children }) => {
    const childrenAsArray = Children.toArray(children);

    const firstChild = childrenAsArray[0] as any;
    const text = firstChild.props.text;

    const todo = createTodoFromText(text);

    console.log('model', todo);

    const className = composeClassName({
        'line-through': todo.isDone(),
    });

    return <div className={className}>{children}</div>;
};

export default Todo;
