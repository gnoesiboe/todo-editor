import { FC } from 'react';
import useEnabledActions from './hooks/useEnabledActions';
import ToolbarItem from './components/ToolbarItem';
import useHandleActionClick from './hooks/useHandleActionClick';
import useDeterminePositionOnScreen from './hooks/useDeterminePositionOnScreen';

const Toolbar: FC = () => {
    const enabledActions = useEnabledActions();
    const handleActionClick = useHandleActionClick();
    const position = useDeterminePositionOnScreen();

    if (enabledActions.length === 0 || !position) {
        return null;
    }

    return (
        <ul
            className="flex flex-row gap-1 md:ml-6 ml-3 -mt-6"
            style={{
                position: 'absolute',
                top: position.y - 10,
                left: position.x - 25,
            }}
        >
            {enabledActions.map((action) => (
                <li key={action} className="block">
                    <ToolbarItem
                        action={action}
                        handleActionClick={handleActionClick}
                    />
                </li>
            ))}
        </ul>
    );
};

export default Toolbar;
