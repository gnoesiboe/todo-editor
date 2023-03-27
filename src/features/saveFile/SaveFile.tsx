import { FC } from 'react';
import useFile from './hooks/useFile';
import usePromptWhenClosingWindowWithOpenChanges from './hooks/usePromptWhenClosingWindowWithOpenChanges';
import { useTodosContext } from '../../context/todos/TodosContext';

const SaveFile: FC = () => {
    const { onSaveClick, isSaving } = useFile();

    const { hasOpenChanges } = useTodosContext();

    usePromptWhenClosingWindowWithOpenChanges();

    return (
        <div className="flex justify-start gap-2">
            <button
                type="button"
                className="bg-white px-3 py-1 disabled:opacity-50"
                onClick={onSaveClick}
                disabled={!hasOpenChanges}
            >
                {isSaving ? 'Saving..' : 'Save'}
            </button>
        </div>
    );
};

export default SaveFile;
