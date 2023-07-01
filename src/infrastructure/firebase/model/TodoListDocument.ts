import { DocumentData, Timestamp } from 'firebase/firestore';

export interface TodoListDocument extends DocumentData {
    value: string;
    createdAt: Timestamp;
}

export type DocumentWithId<DocumentData> = DocumentData & {
    id: string;
};
