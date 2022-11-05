import { useEffect, useRef, useState } from 'react';
import { ContentState, EditorState } from 'draft-js';

type Output = {
    hasOpenChanges: boolean;
    markSaved: () => void;
};

export default function useManageHasOpenChangesState(
    editorState: EditorState,
): Output {
    const referenceContentStateRef = useRef<ContentState>(
        editorState.getCurrentContent(),
    );

    const [hasOpenChanges, setHasOpenChanges] = useState<boolean>(false);

    const currentContentState = editorState.getCurrentContent();

    useEffect(() => {
        setHasOpenChanges(
            referenceContentStateRef.current !== currentContentState,
        );
    }, [currentContentState]);

    const markSaved = () => {
        referenceContentStateRef.current = currentContentState;

        setHasOpenChanges(false);
    };

    return {
        hasOpenChanges,
        markSaved,
    };
}
