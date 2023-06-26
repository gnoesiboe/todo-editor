import { createContext, ReactNode, useContext } from 'react';
import { FC } from 'react';
import useAuthState, { AuthState } from './hooks/useAuthState';

type AuthContextValue = AuthState;

const authContext = createContext<AuthContextValue>({
    uid: null,
    isLoggedIn: false,
});

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { state, onLoginClick } = useAuthState();

    return (
        <authContext.Provider value={state}>
            {state.uid ? (
                children
            ) : (
                <div className="w-full text-center pt-10 space-y-4">
                    <h1 className="text-3xl">Todo Editor</h1>
                    <button
                        type="button"
                        onClick={onLoginClick}
                        className="bg-cyan-900 text-white px-5 py-2"
                    >
                        login
                    </button>
                </div>
            )}
        </authContext.Provider>
    );
};

export default AuthContextProvider;

export function useAuthContext(): AuthContextValue {
    return useContext(authContext);
}
