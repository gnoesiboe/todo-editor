import { AuthState } from '../hooks/useAuthState';

const namespace = 'auth';

export function persistAuthState(state: AuthState): void {
    localStorage.setItem(namespace, JSON.stringify(state));
}

export function getAuthStateFromStorage(): AuthState | null {
    const value = localStorage.getItem(namespace);

    if (!value) {
        return null;
    }

    return JSON.parse(value);
}
