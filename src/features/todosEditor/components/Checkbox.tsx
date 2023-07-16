import { FC, ReactNode } from 'react';
import useKeyOfContentBlockThatHasFocus from '../hooks/useKeyOfContentBlockThatHasFocus';

type Props = {
    children: ReactNode;
    blockKey: string;
};

const Checkbox: FC<Props> = ({ children, blockKey }) => {
    const hasFocus = useKeyOfContentBlockThatHasFocus() === blockKey;

    const className = hasFocus ? 'text-orange-500 font-bold' : 'opacity-30';

    return <span className={className}>{children}</span>;
};

export default Checkbox;
