import { FC } from 'react';
import { Database } from 'react-feather';
import composeClassName from 'classnames';

type Props = {
    isSaving: boolean;
};

const SavingIndicator: FC<Props> = ({ isSaving }) => {
    const className = composeClassName(
        'absolute top-2 right-2 transition-opacity',
        {
            'opacity-50': isSaving,
            'opacity-0': !isSaving,
        },
    );

    return <Database size={12} className={className} />;
};

export default SavingIndicator;
