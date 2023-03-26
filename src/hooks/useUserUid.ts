import { useAuthContext } from '../context/auth/AuthContext';

export default function useUserUid() {
    const { uid } = useAuthContext();

    if (!uid) {
        throw new Error(
            'Expecting Firebase user uid to be available at this point',
        );
    }

    return uid;
}
