import { TodoListDocument, DocumentWithId } from '../model/TodoListDocument';
import { getFirebaseFirestore } from '../firebase';
import {
    addDoc,
    updateDoc,
    getDocs,
    doc,
    collection,
    query,
    orderBy,
    limit,
    deleteDoc,
} from 'firebase/firestore';
import { usersCollectionName } from './userRepository';
import { Logger } from '@tapraise/logger';

const collectionName = 'todoLists';

const logger = new Logger({
    namespace: 'repository',
});

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

    logger.info('persist existing', todoList);

    await updateDoc(docRef, todoList);
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

    logger.info('persist new', todoList);

    const result = await addDoc(collectionRef, todoList);

    return { id: result.id, ...todoList };
}

export async function deleteTodoList(
    userUid: string,
    id: string,
): Promise<void> {
    logger.info('delete', id);

    const docRef = doc(
        getFirebaseFirestore(),
        usersCollectionName,
        userUid,
        collectionName,
        id,
    );

    await deleteDoc(docRef);
}

export async function getTodoListsForUser(
    userUid: string,
): Promise<DocumentWithId<TodoListDocument>[]> {
    logger.info('get todos');

    const docsRef = collection(
        getFirebaseFirestore(),
        usersCollectionName,
        userUid,
        collectionName,
    );

    const q = query(docsRef, orderBy('createdAt', 'desc'), limit(10));

    const snapshot = await getDocs<TodoListDocument>(q as any);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}
