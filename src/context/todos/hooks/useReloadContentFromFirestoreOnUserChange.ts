import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getTodoListForUser } from '../../../infrastructure/firebase/repository/todoListRepository';
import { ContentState, EditorState } from 'draft-js';
import { createEditorDecorator } from '../../../features/todosEditor/decorator/decoratorFactory';
import useUserUid from '../../../hooks/useUserUid';

export default function useReloadContentFromFirestoreOnUserChange(
    setEditorState: Dispatch<SetStateAction<EditorState>>,
): boolean {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const userUid = useUserUid();

    useEffect(() => {
        getTodoListForUser(userUid).then((data) => {
            let editorState: EditorState;

            if (data) {
                editorState = EditorState.createWithContent(
                    ContentState.createFromText(data.value, '\n'),
                    createEditorDecorator(),
                );
            } else {
                editorState = EditorState.createEmpty(createEditorDecorator());
            }

            setEditorState(editorState);

            setIsLoaded(true);
        });
    }, [setEditorState, userUid]);

    return isLoaded;
}
