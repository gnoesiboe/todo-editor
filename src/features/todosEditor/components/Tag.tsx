import { FC, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Tag: FC<Props> = ({ children }) => {
    return <em className="text-cyan-900">{children}</em>;
};

export default Tag;
