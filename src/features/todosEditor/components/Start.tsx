import { FC, ReactNode } from 'react';
import useKeyOfContentBlockThatHasFocus from '../hooks/useKeyOfContentBlockThatHasFocus';
import {
    formatAsDateDescription,
    parseDateDescription,
} from '../../../utilities/dateTimeUtilities';
import composeClassName from 'classnames';

type Props = {
    children: ReactNode;
    blockKey: string;
    decoratedText: string;
};

const Start: FC<Props> = ({ children, blockKey, decoratedText }) => {
    const hasFocus = useKeyOfContentBlockThatHasFocus() === blockKey;

    const [, value] = decoratedText.split(':');

    if (!value) {
        throw new Error('est');
    }

    const valueAsDate = parseDateDescription(value);

    const sharedClassName = 'font-bold';

    if (hasFocus) {
        return <span className={sharedClassName}>{children}</span>;
    }

    return (
        <span className={sharedClassName}>
            st:{valueAsDate ? formatAsDateDescription(valueAsDate) : value}
        </span>
    );
};

export default Start;
