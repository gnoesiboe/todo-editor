import { FC, MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import { ChevronUp } from 'react-feather';
import composeClassName from 'classnames';
import { useWindowSize } from '@uidotdev/usehooks';

type Props = {
    children: ReactNode;
};

const CollapsibleSidebar: FC<Props> = ({ children }) => {
    const { width } = useWindowSize();

    const [isCollapsed, setIsCollapsed] = useState<boolean | null>(null);

    useEffect(() => {
        if (typeof width === 'number' && isCollapsed === null) {
            setIsCollapsed(width < 768);
        }
    }, [width, isCollapsed]);

    const onToggleCLick: MouseEventHandler = () => {
        setIsCollapsed((currentValue) => !currentValue);
    };

    return (
        <div className="bg-amber-200 w-full md:w-3/12 ">
            <div
                className="border border-b-white py-2 px-6 flex justify-between cursor-pointer"
                onClick={onToggleCLick}
            >
                <h2>Filters</h2>
                <button type="button" onClick={onToggleCLick}>
                    <ChevronUp
                        className={composeClassName(
                            'transition-transform',
                            isCollapsed ? 'rotate-180' : '',
                        )}
                    />
                </button>
            </div>
            {!isCollapsed && <div className="p-6 space-y-8">{children}</div>}
        </div>
    );
};

export default CollapsibleSidebar;
