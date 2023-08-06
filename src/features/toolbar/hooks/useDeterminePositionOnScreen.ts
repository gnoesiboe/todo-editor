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

        const rects = range.getClientRects();
        if (rects.length === 0) {
            return null;
        }

        const firstRect = range.getClientRects()[0];

        return {
            y: firstRect.y + viewportOffset,
            x: firstRect.x,
        };
    } catch (error) {
        return null;
    }
}
