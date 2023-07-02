import { initializeApp, FirebaseApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as doSignOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

let app: FirebaseApp;

export function initializeFirebase(): void {
    if (app) {
        throw new Error('Firebase App already initialized');
    }

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };

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

export function getFirebaseFirestore() {
    return getFirestore(getFirebaseApp());
}

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

export async function signOut(): Promise<void> {
    await doSignOut(getFirebaseAuth());
}
