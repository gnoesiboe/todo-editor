import { FC } from 'react';
import useSaveFile from './hooks/useSaveFile';
import usePromptWhenClosingWindowWithOpenChanges from './hooks/usePromptWhenClosingWindowWithOpenChanges';
import { useTodosContext } from '../../context/todos/TodosContext';
import { Save } from 'react-feather';
import SavingIndicator from './components/SavingIndicator';

const SaveFile: FC = () => {
    const { onSaveClick, isSaving } = useSaveFile();

    const { hasOpenChanges } = useTodosContext();

    usePromptWhenClosingWindowWithOpenChanges();

    return (
        <div className="flex justify-end gap-2">
            <SavingIndicator isSaving={isSaving} />

            <button
                type="button"
                className="bg-cyan-900 text-white px-3 py-1 disabled:opacity-50 flex items-center align-middle gap-2"
                onClick={onSaveClick}
                disabled={!hasOpenChanges || isSaving}
            >
                <Save size={12} />
                Save
            </button>
        </div>
    );
};

export default SaveFile;
