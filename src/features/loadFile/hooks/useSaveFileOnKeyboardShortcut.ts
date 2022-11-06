import { useEffect, useRef } from 'react';
import { useTodosContext } from '../../../context/todos/TodosContext';

export default function useSaveFileOnKeyboardShortcut(
    lastUploadedFileName: string | null,
) {
    const isSavingRef = useRef<boolean>(false);
    const { editorState, markSaved } = useTodosContext();

    const contentState = editorState.getCurrentContent();

    // @todo only save when there are changes to be saved?

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                event.stopPropagation();

                if (isSavingRef.current) {
                    return;
                }

                isSavingRef.current = true;

                const content = contentState.getPlainText('\n');
                const encodedContent = window.btoa(content);

                const tempLink = document.createElement('a');
                tempLink.href = `data:text/markdown;base64,${encodedContent}`;
                tempLink.download = lastUploadedFileName || 'todo.md';
                tempLink.classList.add('d-none');
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);

                // Mark saved even though we do not know if the user actually saved after
                // the save dialog was shown.
                markSaved();

                // Due to some kind of loop we tend to get in, we wait a while before
                // allowing save again
                setTimeout(() => {
                    console.log('saving allowed again');
                    isSavingRef.current = false;
                }, 5000);
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [contentState, lastUploadedFileName, markSaved]);
}
