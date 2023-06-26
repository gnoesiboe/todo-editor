import { MouseEventHandler, useEffect, useState } from 'react';
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

export default function useAuthState() {
    const [state, setState] = useState<AuthState>(
        getAuthStateFromStorage() || {
            uid: null,
            isLoggedIn: false,
        },
    );

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

    const onLoginClick: MouseEventHandler<HTMLButtonElement> = () => {
        if (state.uid) {
            console.warn('User is already logged in.');

            return;
        }

        signIn().then((uid) => setState({ uid, isLoggedIn: !!uid }));
    };

    return { state, onLoginClick };
}
