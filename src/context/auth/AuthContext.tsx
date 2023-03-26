import { createContext, ReactNode, useContext } from 'react';
import { FC } from 'react';
import useAuthState, { AuthState } from './hooks/useAuthState';

type AuthContextValue = AuthState;

const authContext = createContext<AuthContextValue>({
    uid: null,
    isLoggedIn: false,
});

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const state = useAuthState();

    return (
        <authContext.Provider value={state}>
            {state.uid && children}
        </authContext.Provider>
    );
};

export default AuthContextProvider;

export function useAuthContext(): AuthContextValue {
    return useContext(authContext);
}
