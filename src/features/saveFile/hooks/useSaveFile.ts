import {
    Dispatch,
    MouseEventHandler,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { useTodosContext } from '../../../context/todos/TodosContext';
import { persistTodoList } from '../../../infrastructure/firebase/repository/todoListRepository';
import useUserUid from '../../../hooks/useUserUid';
import debounce from 'lodash/debounce';
import { Logger } from '@tapraise/logger';
import { modifyContentBeforeSave } from '../modifier/contentModifier';
import {
    DocumentWithId,
    TodoListDocument,
} from '../../../infrastructure/firebase/model/TodoListDocument';

const logger = new Logger({
    namespace: 'save',
    isEnabled: process.env.NODE_ENV !== 'production',
});

type Output = {
    onSaveClick: MouseEventHandler<HTMLButtonElement>;
    isSaving: boolean;
};

const saveContent = debounce(
    async (
        content: string,
        userUid: string,
        currentTodoList: DocumentWithId<TodoListDocument> | null,
        setIsSaving: Dispatch<SetStateAction<boolean>>,
        markSaved: () => void,
    ): Promise<void> => {
        if (!currentTodoList) {
            logger.warn('no current todo uid, so cannot save content!');

            return;
        }

        setIsSaving(true);

        logger.info('save content');

        const modifiedContent = modifyContentBeforeSave(content);

        await persistTodoList(userUid, {
            ...currentTodoList,
            value: modifiedContent,
        });

        markSaved();

        setIsSaving(false);
    },
    1000,
);

export default function useSaveFile(): Output {
    const userUid = useUserUid();

    const { editorState, markSaved, hasOpenChanges, currentTodoList } =
        useTodosContext();

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

    // Save content when user clicks save button
    const onSaveClick: MouseEventHandler<HTMLButtonElement> = async () => {
        await saveContent(
            content,
            userUid,
            currentTodoList,
            setIsSaving,
            markSaved,
        );
    };

    return { onSaveClick, isSaving };
}
