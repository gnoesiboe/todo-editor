import { FC, ReactNode } from 'react';
import useKeyOfContentBlockThatHasFocus from '../hooks/useKeyOfContentBlockThatHasFocus';
import composeClassName from 'classnames';

type Props = {
    children: ReactNode;
    blockKey: string;
};

const Checkbox: FC<Props> = ({ children, blockKey }) => {
    const hasFocus = useKeyOfContentBlockThatHasFocus() === blockKey;

    const className = hasFocus ? 'text-orange-500 font-bold' : 'opacity-30';

    return (
        <>
            <span
                className={className}
                style={{
                    // Inline block required to override line-through on parent (@see useResolveContentBlockClassName)
                    display: 'inline-block',
                    textDecoration: 'none !important',
                }}
            >
                {children}
            </span>
        </>
    );
};

export default Checkbox;
