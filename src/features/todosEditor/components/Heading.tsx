import { FC, ReactNode } from 'react';
import useKeyOfContentBlockThatHasFocus from '../hooks/useKeyOfContentBlockThatHasFocus';
import composeClassName from 'classnames';

type Props = {
    children: ReactNode;
    decoratedText: string;
    blockKey: string;
};

const Heading: FC<Props> = ({ children, decoratedText, blockKey }) => {
    // @todo apply styling and sematics for different levels

    const hasFocus = useKeyOfContentBlockThatHasFocus() === blockKey;

    const textOnly = decoratedText.replace(/^[#]+/, '').trim();

    const sharedClassNames = [
        'font-extrabold',
        'text-cyan-900',
        'text-lg',
        'my-2',
    ];

    if (hasFocus) {
        const className = composeClassName(...sharedClassNames);

        return <div className={className}>{children}</div>;
    }

    const className = composeClassName(...sharedClassNames, 'underline');

    return <h1 className={className}>{hasFocus ? children : textOnly}</h1>;
};

export default Heading;
