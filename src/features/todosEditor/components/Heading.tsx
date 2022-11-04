import { FC, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Heading: FC<Props> = ({ children }) => {
    // @todo apply styling and sematics for different levels
    return <h1 className="font-extrabold text-cyan-900">{children}</h1>;
};

export default Heading;
