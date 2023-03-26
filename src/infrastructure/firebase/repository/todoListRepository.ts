import { TodoListDocument } from '../model/TodoListDocument';
import { getFirebaseFirestore } from '../firebase';
import { setDoc, getDoc, doc } from 'firebase/firestore';

const collectionName = 'todoLists';

export async function persistTodoList(
    content: string,
    userUid: string,
): Promise<void> {
    const document: TodoListDocument = {
        value: content,
    };

    const docRef = doc(getFirebaseFirestore(), collectionName, userUid);

    await setDoc(docRef, document);
}

export async function getTodoListForUser(
    userUid: string,
): Promise<TodoListDocument | null> {
    const docRef = doc(getFirebaseFirestore(), collectionName, userUid);

    const snapshot = await getDoc<TodoListDocument>(docRef as any);

    return snapshot.data() || null;
}
