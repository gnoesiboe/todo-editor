import { FC, ReactNode } from 'react';
import { Play } from 'react-feather';
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
        // @todo transform relative values, like 'tomorrow' to actual date, as otherwise they would never be reached ;)

        return <span className={sharedClassName}>{children}</span>;
    }

    const containerClassName = composeClassName(
        'inline-flex items-center',
        sharedClassName,
    );

    return (
        <span className={containerClassName}>
            <Play size={8} />
            <span>
                {valueAsDate ? formatAsDateDescription(valueAsDate) : value}
            </span>
        </span>
    );
};

export default Start;
