import { FC, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Project: FC<Props> = ({ children }) => {
    // @todo apply styling and sematics for different levels
    return <h1 className="font-extrabold">{children}</h1>;
};

export default Project;
