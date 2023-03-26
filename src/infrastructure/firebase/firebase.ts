import { initializeApp, FirebaseApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import config from './../../config/firebase.json';

let app: FirebaseApp;

export function initializeFirebase(): void {
    if (app) {
        throw new Error('Firebase App already initialized');
    }

    const firebaseConfig = config;

    // Initialize Firebase
    app = initializeApp(firebaseConfig, {
        name: 'default',
    });
}

function getFirebaseApp(): FirebaseApp {
    if (app) {
        return app;
    }

    initializeFirebase();

    if (!app) {
        throw new Error('Expecting app to be available at this point');
    }

    return app;
}

function getFirebaseAuth() {
    return getAuth(getFirebaseApp());
}

export type onAuthStateChangedListener = (uid: string | null) => void;

export function registerAuthStateChangeListener(
    onAuthStateChangeHandler: onAuthStateChangedListener,
) {
    const auth = getFirebaseAuth();

    onAuthStateChanged(auth, (user) => {
        onAuthStateChangeHandler(user?.uid || null);
    });
}

const provider = new GoogleAuthProvider();

export async function signIn(): Promise<string> {
    const { user } = await signInWithPopup(getFirebaseAuth(), provider);

    return user.uid;
}
