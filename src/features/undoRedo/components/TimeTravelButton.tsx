import { FC, MouseEventHandler } from 'react';
import { Icon } from 'react-feather';

type Props = {
    title: string;
    icon: Icon;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const TimeTravelButton: FC<Props> = ({ title, icon: Icon, onClick }) => (
    <button
        className="p-2 border border-gray-500 hover:bg-gray-100"
        title={title}
        onClick={onClick}
    >
        <Icon size={14} />
    </button>
);

export default TimeTravelButton;
