import { useEffect, useRef, useState } from 'react';
import {
    registerAuthStateChangeListener,
    signIn,
} from '../../../infrastructure/firebase/firebase';
import {
    getAuthStateFromStorage,
    persistAuthState,
} from '../storage/authStateStorage';

export type AuthState = {
    uid: string | null;
    isLoggedIn: boolean;
};

export default function useAuthState(): AuthState {
    const [state, setState] = useState<AuthState>(
        getAuthStateFromStorage() || {
            uid: null,
            isLoggedIn: false,
        },
    );

    const isLoginPendingRef = useRef<boolean>(false);

    useEffect(() => {
        registerAuthStateChangeListener((uid) => {
            setState({
                uid,
                isLoggedIn: !!uid,
            });
        });
    }, []);

    useEffect(() => {
        persistAuthState(state);
    }, [state]);

    useEffect(() => {
        if (state.uid || isLoginPendingRef.current) {
            return;
        }

        isLoginPendingRef.current = true;

        signIn().then((uid) => setState({ uid, isLoggedIn: !!uid }));
    }, [state.uid]);

    return state;
}
