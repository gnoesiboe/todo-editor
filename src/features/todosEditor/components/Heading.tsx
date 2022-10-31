import { FC, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Project: FC<Props> = ({ children }) => {
    return <h1 className="font-extrabold text-green-400">{children}</h1>;
};

export default Project;
