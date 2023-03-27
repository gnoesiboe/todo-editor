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
        setIsSaving: Dispatch<SetStateAction<boolean>>,
        markSaved: () => void,
    ): Promise<void> => {
        setIsSaving(true);

        logger.info('save content');

        await persistTodoList(content, userUid);

        markSaved();

        setIsSaving(false);
    },
    1000,
);

export default function useSaveFile(): Output {
    const userUid = useUserUid();

    const { editorState, markSaved, hasOpenChanges } = useTodosContext();

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const content = editorState.getCurrentContent().getPlainText('\n');

    useEffect(() => {
        if (!hasOpenChanges) {
            logger.info('no open changes to persist');

            return;
        }

        saveContent(content, userUid, setIsSaving, markSaved);
    }, [hasOpenChanges, content, userUid, markSaved]);

    useEffect(() => {
        const onWindowBlur = (event: WindowEventMap['blur']) => {
            logger.info('save on window blur');

            if (!hasOpenChanges) {
                logger.info('no open changes to persist');

                return;
            }

            saveContent(content, userUid, setIsSaving, markSaved);
        };

        window.addEventListener('blur', onWindowBlur);

        return () => window.removeEventListener('blur', onWindowBlur);
    }, [content, hasOpenChanges, markSaved, userUid]);

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                event.stopPropagation();

                logger.info('user save event');

                saveContent(content, userUid, setIsSaving, markSaved);
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [content, markSaved, userUid]);

    const onSaveClick: MouseEventHandler<HTMLButtonElement> = async () => {
        await saveContent(content, userUid, setIsSaving, markSaved);
    };

    return {
        onSaveClick,
        isSaving,
    };
}
