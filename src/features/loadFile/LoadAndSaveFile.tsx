import { FC } from 'react';
import useSaveFileOnKeyboardShortcut from './hooks/useSaveFileOnKeyboardShortcut';
import useLoadSelectedFile from './hooks/useLoadSelectedFile';
import usePromptWhenClosingWIndowWithOpenChanges from './hooks/usePromptWhenClosingWIndowWithOpenChanges';

const LoadAndSaveFile: FC = () => {
    const { onFileChange, lastUploadedFileName } = useLoadSelectedFile();

    useSaveFileOnKeyboardShortcut(lastUploadedFileName);

    usePromptWhenClosingWIndowWithOpenChanges();

    return (
        <div>
            <input
                type="file"
                id="input"
                accept=".md"
                onChange={onFileChange}
                multiple={false}
            />
        </div>
    );
};

export default LoadAndSaveFile;
