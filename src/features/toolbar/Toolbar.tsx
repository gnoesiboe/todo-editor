import { FC } from 'react';
import useEnabledActions from './hooks/useEnabledActions';
import ToolbarItem from './components/ToolbarItem';
import useHandleActionClick from './hooks/useHandleActionClick';

const Toolbar: FC = () => {
    const enabledActions = useEnabledActions();
    const handleActionClick = useHandleActionClick();

    if (enabledActions.length === 0) {
        return null;
    }

    return (
        <ul className="flex flex-row gap-1 sticky left-0 top-0 md:ml-6 ml-3 -mt-6">
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
