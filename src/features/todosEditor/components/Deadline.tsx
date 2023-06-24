import { FC, ReactNode } from 'react';
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

    const className = composeClassName('font-bold', {
        'text-red-600': urgencyLevel === 1,
        'text-orange-400': urgencyLevel === 2,
        'text-green-800': urgencyLevel === 3,
    });

    if (hasFocus) {
        return <span className={className}>{children}</span>;
    }

    return (
        <span className={className}>
            dl:{valueAsDate ? formatAsDateDescription(valueAsDate) : value}
        </span>
    );
};

export default Deadline;
