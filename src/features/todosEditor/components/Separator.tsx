import { FC, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Separator: FC<Props> = ({ children }) => {
    return <div className="text-gray-400 text-center">{children}</div>;
};

export default Separator;
