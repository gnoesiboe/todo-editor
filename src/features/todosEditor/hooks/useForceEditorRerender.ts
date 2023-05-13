import { useEffect } from 'react';
import { useTodosContext } from '../../../context/todos/TodosContext';
import { useFilterContext } from '../../../context/filter/FilterContext';

export default function useForceEditorRerender(): void {
    const { hiddenProjects, hiddenTags, hiddenStartPeriods } =
        useFilterContext();

    const { forceRerender } = useTodosContext();

    useEffect(() => {
        forceRerender();
        // Did not add forceRerender to useEffect dependencies as this would cause an infinite loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hiddenProjects, hiddenTags, hiddenStartPeriods]);
}
