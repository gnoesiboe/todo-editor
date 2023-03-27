import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { ContentState, EditorState } from 'draft-js';
import { createEditorDecorator } from '../../todosEditor/decorator/decoratorFactory';
import { useTodosContext } from '../../../context/todos/TodosContext';
import {
    getTodoListForUser,
    persistTodoList,
} from '../../../infrastructure/firebase/repository/todoListRepository';
import useUserUid from '../../../hooks/useUserUid';

type Output = {
    onSaveClick: MouseEventHandler<HTMLButtonElement>;
    isSaving: boolean;
};

export default function useFile(): Output {
    const userUid = useUserUid();

    const { editorState, setEditorState, markSaved } = useTodosContext();

    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {
        getTodoListForUser(userUid).then((data) => {
            if (!data) {
                return;
            }

            const newEditorState = EditorState.createWithContent(
                ContentState.createFromText(data.value, '\n'),
                createEditorDecorator(),
            );

            setEditorState(newEditorState);
        });
    }, [setEditorState, userUid]);

    const contentState = editorState.getCurrentContent();

    const save = useCallback(async () => {
        const content = contentState.getPlainText('\n');

        await persistTodoList(content, userUid);

        markSaved();

        setIsSaving(false);
    }, [contentState, markSaved, userUid]);

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                event.stopPropagation();

                // noinspection JSIgnoredPromiseFromCall
                save();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [contentState, save]);

    const onSaveClick: MouseEventHandler<HTMLButtonElement> = async () => {
        await save();
    };

    return {
        onSaveClick,
        isSaving,
    };
}
