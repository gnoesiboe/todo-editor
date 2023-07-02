import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';
import {
    persistExistingTodoList,
    persistNewTodoList,
} from '../../../infrastructure/firebase/repository/todoListRepository';
import debounce from 'lodash/debounce';
import { modifyContentBeforeSave } from '../../../features/saveFile/modifier/contentModifier';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../../infrastructure/firebase/model/TodoListDocument';
import { EditorState } from 'draft-js';
import useUserUid from '../../../hooks/useUserUid';
import { Logger } from '@tapraise/logger';
import { Timestamp } from 'firebase/firestore';

const logger = new Logger({
    namespace: 'save',
    isEnabled: process.env.NODE_ENV !== 'production',
});

const saveContent = debounce(
    async (
        content: string,
        userUid: string,
        currentTodoList: DocumentWithId<TodoListDocument> | null,
        setIsSaving: Dispatch<SetStateAction<boolean>>,
        markSaved: () => void,
    ): Promise<void> => {
        setIsSaving(true);

        logger.info('save content');

        const modifiedContent = modifyContentBeforeSave(content);

        if (!currentTodoList) {
            await persistNewTodoList(userUid, {
                value: modifiedContent,
                createdAt: Timestamp.now(),
            });
        } else {
            await persistExistingTodoList(userUid, {
                ...currentTodoList,
                value: modifiedContent,
            });
        }

        markSaved();

        setIsSaving(false);
    },
    1000,
);

export default function usePersistCurrentTodoList(
    editorState: EditorState,
    currentTodoList: DocumentWithId<TodoListDocument> | null,
    markSaved: () => void,
    hasOpenChanges: boolean,
) {
    const userUid = useUserUid();

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const content = editorState.getCurrentContent().getPlainText('\n');

    // Save content on content change
    useEffect(() => {
        if (!hasOpenChanges) {
            logger.info('no open changes to persist');

            return;
        }

        saveContent(content, userUid, currentTodoList, setIsSaving, markSaved);
    }, [hasOpenChanges, content, userUid, markSaved, currentTodoList]);

    // Save content on window blur
    useEffect(() => {
        const onWindowBlur = (event: WindowEventMap['blur']) => {
            logger.info('save on window blur');

            if (!hasOpenChanges) {
                logger.info('no open changes to persist');

                return;
            }

            saveContent(
                content,
                userUid,
                currentTodoList,
                setIsSaving,
                markSaved,
            );
        };

        window.addEventListener('blur', onWindowBlur);

        return () => window.removeEventListener('blur', onWindowBlur);
    }, [content, currentTodoList, hasOpenChanges, markSaved, userUid]);

    // Save content when user presses save keyboard shortcut
    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                event.stopPropagation();

                logger.info('user save event');

                saveContent(
                    content,
                    userUid,
                    currentTodoList,
                    setIsSaving,
                    markSaved,
                );
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [content, currentTodoList, markSaved, userUid]);

    const persistCurrentTodoList = useCallback(async () => {
        await saveContent(
            content,
            userUid,
            currentTodoList,
            setIsSaving,
            markSaved,
        );
    }, [content, currentTodoList, markSaved, userUid]);

    return { isSaving, persistCurrentTodoList };
}
