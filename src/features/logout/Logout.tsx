import { FC, MouseEventHandler } from 'react';
import { signOut } from '../../infrastructure/firebase/firebase';

const Logout: FC = () => {
    const onClick: MouseEventHandler<HTMLButtonElement> = async () => {
        await signOut();
    };

    return (
        <button
            type="button"
            className="hover:underline font-bold"
            onClick={onClick}
        >
            logout
        </button>
    );
};

export default Logout;
