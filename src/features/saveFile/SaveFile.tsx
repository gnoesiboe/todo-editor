import { FC } from 'react';
import useSaveFile from './hooks/useSaveFile';
import usePromptWhenClosingWindowWithOpenChanges from './hooks/usePromptWhenClosingWindowWithOpenChanges';
import { useTodosContext } from '../../context/todos/TodosContext';
import PuffLoader from 'react-spinners/PuffLoader';
import SavingIndicator from './components/SavingIndicator';

const SaveFile: FC = () => {
    const { onSaveClick, isSaving } = useSaveFile();

    const { hasOpenChanges } = useTodosContext();

    usePromptWhenClosingWindowWithOpenChanges();

    return (
        <div className="flex justify-start gap-2">
            <SavingIndicator isSaving={isSaving} />

            <button
                type="button"
                className="bg-white px-3 py-1 disabled:opacity-50 flex items-center align-middle gap-2"
                onClick={onSaveClick}
                disabled={!hasOpenChanges || isSaving}
            >
                <PuffLoader
                    loading={isSaving}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    className="mx-auto"
                />
                {!isSaving && 'Save'}
            </button>
        </div>
    );
};

export default SaveFile;
