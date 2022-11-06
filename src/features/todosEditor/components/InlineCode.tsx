import { FC, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const InlineCode: FC<Props> = ({ children }) => {
    return <code>{children}</code>;
};

export default InlineCode;
