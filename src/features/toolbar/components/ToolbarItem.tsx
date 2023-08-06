import { FC, MouseEventHandler, TouchEventHandler } from 'react';
import { ToolbarAction } from '../hooks/useEnabledActions';
import ToolbarItemIcon from './ToolbarItemIcon';

export type ToolbarActionClickHandler = (action: ToolbarAction) => void;

type Props = {
    action: ToolbarAction;
    handleActionClick: ToolbarActionClickHandler;
};

const ToolbarItem: FC<Props> = ({ action, handleActionClick }) => {
    const onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();

        handleActionClick(action);
    };

    const onTouchStart: TouchEventHandler = (event): void => {
        event.preventDefault();
        event.stopPropagation();

        handleActionClick(action);
    };

    // Using diff instead of button to prevent losing focus in the editor
    // @see https://github.com/facebookarchive/draft-js/issues/696#issuecomment-302903086
    return (
        <div
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            aria-roledescription="button"
            role="button"
            className="bg-white border border-gray-400 p-1 hover:border-gray-900 cursor-pointer"
        >
            <ToolbarItemIcon action={action} />
        </div>
    );
};

export default ToolbarItem;
