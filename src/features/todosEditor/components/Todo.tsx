import { FC, ReactNode } from 'react';

type Props = {
    children: string;
};

const Todo: FC<Props> = ({ children }) => {
    console.log('children', children);

    // const parts = children.split(/\* \[[ x-]{1,1}]/g);

    return <div className="underline italic">{children}</div>;
};

export default Todo;
