import { FC, ReactNode } from 'react';
import useKeyOfContentBlockThatHasFocus from '../hooks/useKeyOfContentBlockThatHasFocus';
import { AlignJustify } from 'react-feather';

type Props = {
    children: ReactNode;
    decoratedText: string;
    blockKey: string;
};

const Notes: FC<Props> = ({ children, decoratedText, blockKey }) => {
    const hasFocus = useKeyOfContentBlockThatHasFocus() === blockKey;

    if (hasFocus) {
        return <span>{children}</span>;
    }

    const textOnly = decoratedText.replace(/[<>]+/g, '').trim();

    return (
        <span title={textOnly} className="cursor-help">
            <AlignJustify size={14} className="inline-block" />
        </span>
    );
};

export default Notes;
