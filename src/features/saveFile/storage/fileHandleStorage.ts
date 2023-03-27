import { set, get } from 'idb-keyval';

const namespace = 'todoFileHandle';

export async function saveFileHandle(
    fileHandle: FileSystemFileHandle,
): Promise<void> {
    await set(namespace, fileHandle);
}

export async function getFileHandle(): Promise<
    FileSystemFileHandle | undefined
> {
    return await get<FileSystemFileHandle>(namespace);
}
