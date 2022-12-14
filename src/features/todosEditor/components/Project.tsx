import { FC, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Project: FC<Props> = ({ children }) => {
    return <strong className="text-blue-600">{children}</strong>;
};

export default Project;
