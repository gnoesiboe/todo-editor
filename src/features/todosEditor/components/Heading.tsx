import { createElement, FC, ReactNode } from 'react';
import useKeyOfContentBlockThatHasFocus from '../hooks/useKeyOfContentBlockThatHasFocus';
import composeClassName from 'classnames';

type Props = {
    children: ReactNode;
    decoratedText: string;
    blockKey: string;
};

const Heading: FC<Props> = ({ children, decoratedText, blockKey }) => {
    const levelMatch = decoratedText.match(/^([#]+)/) as RegExpMatchArray;
    const level = levelMatch[1] ? levelMatch[1].length : 1;

    const sharedClassNames = composeClassName(
        ['font-extrabold', 'inline-block', 'mb-2', 'mt-8'],
        {
            'text-xl text-white uppercase bg-cyan-900 py-1 px-3 -mx-6':
                level === 1,
            'text-lg text-cyan-900': level === 2,
        },
    );

    const hasFocus = useKeyOfContentBlockThatHasFocus() === blockKey;
    if (hasFocus) {
        const className = composeClassName(sharedClassNames);

        return <div className={className}>{children}</div>;
    }
    const className = composeClassName(sharedClassNames);

    const textOnly = decoratedText.replace(/^[#]+/, '').trim();

    return createElement(
        `h${level}`,
        { className },
        hasFocus ? children : textOnly,
    );
};

export default Heading;
