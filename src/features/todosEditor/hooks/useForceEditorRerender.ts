import { useEffect } from 'react';
import { useTodosContext } from '../../../context/todos/TodosContext';

export default function useForceEditorRerender(...dependencies: any[]): void {
    const { forceRerender } = useTodosContext();

    useEffect(() => {
        forceRerender();
        // Did not add forceRerender to useEffect dependencies as this would cause an infinite loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
}
