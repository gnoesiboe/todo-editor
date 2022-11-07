import { FC, ReactNode } from 'react';
import { Clock } from 'react-feather';
import useKeyOfContentBlockThatHasFocus from '../hooks/useKeyOfContentBlockThatHasFocus';
import {
    determineUrgencyLevel,
    formatAsDateDescription,
    parseDateDescription,
} from '../../../utilities/dateTimeUtilities';
import composeClassName from 'classnames';

type Props = {
    children: ReactNode;
    blockKey: string;
    decoratedText: string;
};

const Deadline: FC<Props> = ({ children, blockKey, decoratedText }) => {
    const hasFocus = useKeyOfContentBlockThatHasFocus() === blockKey;

    const [, value] = decoratedText.split(':');

    if (!value) {
        throw new Error('est');
    }

    const valueAsDate = parseDateDescription(value);

    const urgencyLevel = valueAsDate ? determineUrgencyLevel(valueAsDate) : 3;

    const colorClassName = composeClassName('font-bold', {
        'text-red-600': urgencyLevel === 1,
        'text-orange-400': urgencyLevel === 2,
        'text-green-800': urgencyLevel === 3,
    });

    if (hasFocus) {
        // @todo transform relative values, like 'tomorrow' to actual date, as otherwise they would never be reached ;)

        return <span className={colorClassName}>{children}</span>;
    }

    const containerClassName = composeClassName(
        'inline-flex gap-1 items-center',
        colorClassName,
    );

    return (
        <span className={containerClassName}>
            <Clock size={8} />
            <span>
                {valueAsDate ? formatAsDateDescription(valueAsDate) : value}
            </span>
        </span>
    );
};

export default Deadline;
