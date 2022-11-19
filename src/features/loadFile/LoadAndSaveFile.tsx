import { FC } from 'react';
import useSaveFile from './hooks/useSaveFile';
import useLoadSelectedFile from './hooks/useLoadSelectedFile';
import usePromptWhenClosingWIndowWithOpenChanges from './hooks/usePromptWhenClosingWIndowWithOpenChanges';

const LoadAndSaveFile: FC = () => {
    const { onFileChange, lastUploadedFileName } = useLoadSelectedFile();

    const save = useSaveFile(lastUploadedFileName);

    usePromptWhenClosingWIndowWithOpenChanges();

    return (
        <div className="flex justify-start gap-2">
            <input
                type="file"
                id="input"
                accept=".md"
                onChange={onFileChange}
                multiple={false}
            />
            <button type="button" className="bg-white px-3 py-1" onClick={save}>
                Save file
            </button>
        </div>
    );
};

export default LoadAndSaveFile;
