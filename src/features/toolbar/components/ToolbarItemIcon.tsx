import { FC } from 'react';
import { ToolbarAction } from '../hooks/useEnabledActions';
import { CheckSquare, Icon, ArrowUp, ArrowDown, Square } from 'react-feather';

type Props = {
    action: ToolbarAction;
};

function determineIcon(action: ToolbarAction): Icon {
    switch (action) {
        case 'toggleChecked':
            return CheckSquare;

        case 'moveUp':
            return ArrowUp;

        case 'moveDown':
            return ArrowDown;

        case 'startTodo':
            return Square;

        default:
            throw new Error(`Unsupported action ${action}`);
    }
}

const ToolbarItemIcon: FC<Props> = ({ action }) => {
    const Icon = determineIcon(action);

    return <Icon size={14} />;
};

export default ToolbarItemIcon;
