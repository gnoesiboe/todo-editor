import { FC, useEffect, useRef, useState } from 'react';
import { Database } from 'react-feather';
import composeClassName from 'classnames';

type Props = {
    isSaving: boolean;
};

const SavingIndicator: FC<Props> = ({ isSaving }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const timeoutHandleRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isSaving) {
            setIsAnimating(true);
        } else if (isAnimating) {
            timeoutHandleRef.current = setTimeout(() => {
                setIsAnimating(false);
            }, 2000);
        }

        return () => {
            if (timeoutHandleRef.current) {
                clearTimeout(timeoutHandleRef.current);
            }
        };
    }, [isAnimating, isSaving]);

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
