import { FC, MouseEventHandler, ReactNode } from 'react';
import { useTodosContext } from '../../../context/todos/TodosContext';
import { ContentState } from 'draft-js';
import useKeyOfContentBlockThatHasFocus from '../hooks/useKeyOfContentBlockThatHasFocus';

type Props = {
    children: ReactNode;
    decoratedText: string;
    contentState: ContentState;
    blockKey: string;
};

const Link: FC<Props> = ({
    children,
    decoratedText,
    contentState,
    blockKey,
    ...otherProps
}) => {
    const hasFocus = useKeyOfContentBlockThatHasFocus() === blockKey;

    const [label, url] = decoratedText
        .split('](')
        .map((item) => item.replace(/[\[()\]]+/, '').trim());

    const onClick: MouseEventHandler = (event) => {
        if (event.ctrlKey) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    if (hasFocus) {
        return (
            <span className="underline cursor-pointer" onClick={onClick}>
                {children}
            </span>
        );
    }

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline cursor-pointer"
            onClick={onClick}
        >
            {label}
        </a>
    );
};

export default Link;
