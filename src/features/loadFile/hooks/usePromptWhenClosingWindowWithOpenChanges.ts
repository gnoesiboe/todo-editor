import { useTodosContext } from '../../../context/todos/TodosContext';
import { useEffect } from 'react';

export default function usePromptWhenClosingWindowWithOpenChanges() {
    const { hasOpenChanges } = useTodosContext();

    useEffect(() => {
        if (!hasOpenChanges) {
            return;
        }

        const onBeforeUnload = (event: WindowEventMap['beforeunload']) => {
            event.preventDefault();

            // Will probably not be displayed, as modern browser no longer allow this
            event.returnValue =
                'Are you sure? You have open changes that have not yet been saved!';

            return true;
        };

        window.addEventListener('beforeunload', onBeforeUnload);

        return () => window.removeEventListener('beforeunload', onBeforeUnload);
    }, [hasOpenChanges]);
}
