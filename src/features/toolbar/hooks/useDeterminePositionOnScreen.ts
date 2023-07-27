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

        const rect = range.getClientRects()[0];

        return {
            y: rect.y + viewportOffset,
            x: rect.x,
        };
    } catch (error) {
        return null;
    }
}
