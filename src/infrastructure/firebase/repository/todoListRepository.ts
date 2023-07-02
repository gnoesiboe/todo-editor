import { TodoListDocument, DocumentWithId } from '../model/TodoListDocument';
import { getFirebaseFirestore } from '../firebase';
import {
    addDoc,
    setDoc,
    getDocs,
    doc,
    collection,
    query,
    orderBy,
} from 'firebase/firestore';
import { usersCollectionName } from './userRepository';

const collectionName = 'todoLists';

export async function persistExistingTodoList(
    userUid: string,
    todoList: DocumentWithId<TodoListDocument>,
): Promise<void> {
    const docRef = doc(
        getFirebaseFirestore(),
        usersCollectionName,
        userUid,
        collectionName,
        todoList.id,
    );

    await setDoc(docRef, todoList);
}

export async function persistNewTodoList(
    userUid: string,
    todoList: TodoListDocument,
): Promise<DocumentWithId<TodoListDocument>> {
    const collectionRef = collection(
        getFirebaseFirestore(),
        usersCollectionName,
        userUid,
        collectionName,
    );

    const result = await addDoc(collectionRef, todoList);

    return { id: result.id, ...todoList };
}

export async function getTodoListsForUser(
    userUid: string,
): Promise<DocumentWithId<TodoListDocument>[]> {
    const docsRef = collection(
        getFirebaseFirestore(),
        usersCollectionName,
        userUid,
        collectionName,
    );

    const q = query(docsRef, orderBy('createdAt', 'desc'));

    const snapshot = await getDocs<TodoListDocument>(q as any);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}
