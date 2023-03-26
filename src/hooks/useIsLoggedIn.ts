import { useAuthContext } from '../context/auth/AuthContext';

export default function useIsLoggedIn() {
    const state = useAuthContext();

    return !!state.uid;
}
