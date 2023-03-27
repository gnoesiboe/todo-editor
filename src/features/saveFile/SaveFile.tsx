import { FC } from 'react';
import useFile from './hooks/useFile';
import usePromptWhenClosingWindowWithOpenChanges from './hooks/usePromptWhenClosingWindowWithOpenChanges';

const SaveFile: FC = () => {
    const { onSaveClick, isSaving } = useFile();

    usePromptWhenClosingWindowWithOpenChanges();

    return (
        <div className="flex justify-start gap-2">
            <button
                type="button"
                className="bg-white px-3 py-1"
                onClick={onSaveClick}
            >
                {isSaving ? 'Saving..' : 'Save'}
            </button>
        </div>
    );
};

export default SaveFile;
