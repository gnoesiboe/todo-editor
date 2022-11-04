import { FC, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Separator: FC<Props> = ({ children }) => {
    return (
        <div className="text-gray-400 text-center bg-gray-100 my-10">
            {children}
        </div>
    );
};

export default Separator;
