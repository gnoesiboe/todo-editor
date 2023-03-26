import { DocumentData } from 'firebase/firestore';

export interface TodoListDocument extends DocumentData {
    value: string;
}
