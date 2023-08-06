import { getVisibleSelectionRect } from 'draft-js';

type Position = {
    x: number;
    y: number;
};

export default function useDeterminePositionOnScreen(): Position | null {
    const currentSelection = window.getSelection();
    if (!currentSelection) {
        return null;
    }

    try {
        const range = currentSelection.getRangeAt(0).cloneRange();
        range.collapse(true);

        const viewportOffset = Math.abs(
            document.body.getBoundingClientRect().top,
        );

        let rect = getVisibleSelectionRect(document);
        if (!rect) {
            // @see https://github.com/facebookarchive/draft-js/issues/516#issuecomment-748983702
            rect = (range.startContainer as Element).getBoundingClientRect();
        }

        return {
            y: rect.top + viewportOffset,
            x: rect.left,
        };
    } catch (error) {
        return null;
    }
}
