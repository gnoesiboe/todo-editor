import { FC, useEffect, useState } from 'react';
import { Database } from 'react-feather';
import composeClassName from 'classnames';

type Props = {
    isSaving: boolean;
};

const SavingIndicator: FC<Props> = ({ isSaving }) => {
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        let timeoutHandle: NodeJS.Timeout | null = null;

        if (isSaving) {
            setIsAnimating(true);
        } else {
            timeoutHandle = setTimeout(() => {
                setIsAnimating(false);
            }, 2000);
        }

        return () => {
            if (timeoutHandle) {
                clearTimeout(timeoutHandle);
            }
        };
    }, [isSaving]);

    const className = composeClassName(
        'fixed top-2 right-2 transition-opacity duration-1000',
        {
            'opacity-100 animate-bounce': isAnimating,
            'opacity-10': !isAnimating,
        },
    );

    return <Database size={12} className={className} />;
};

export default SavingIndicator;
