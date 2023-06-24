import {
    createContext,
    FC,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from 'react';
import useToggleProject from './hooks/useToggleProject';
import useToggleTag from './hooks/useToggleTag';
import { StartPeriod } from '../../features/startPeriodFilter/hooks/useResolveStartPeriodsAndCounts';
import useToggleStartPeriod from './hooks/useToggleStartPeriod';
import { DeadlinePeriod } from '../../features/deadlinePeriodFilter/hooks/useResolveDeadlinePeriodsAndCounts';
import useToggleDeadlinePeriod from './hooks/useToggleDeadlinePeriod';

export type FilterContextValue = {
    hiddenProjects: string[];
    hiddenTags: string[];
    hiddenStartPeriods: StartPeriod[];
    hiddenDeadlinePeriods: DeadlinePeriod[];
    toggleProject: (project: string, reverse: boolean) => void;
    toggleTag: (tag: string, reverse: boolean) => void;
    toggleStartPeriod: (startPeriod: StartPeriod) => void;
    toggleDeadlinePeriod: (deadlinePeriod: DeadlinePeriod) => void;
};

const FilterContext = createContext<FilterContextValue>({
    hiddenProjects: [],
    hiddenTags: [],
    hiddenStartPeriods: [],
    hiddenDeadlinePeriods: [],
    toggleProject: () => {},
    toggleTag: () => {},
    toggleStartPeriod: () => {},
    toggleDeadlinePeriod: () => {},
});

export const FilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<
        Pick<
            FilterContextValue,
            | 'hiddenProjects'
            | 'hiddenTags'
            | 'hiddenStartPeriods'
            | 'hiddenDeadlinePeriods'
        >
    >({
        hiddenProjects: [],
        hiddenTags: [],
        hiddenStartPeriods: ['today or before', 'this week', 'this month'],
        hiddenDeadlinePeriods: ['today or before', 'this week', 'this month'],
    });

    const toggleTag = useToggleTag(setState);
    const toggleProject = useToggleProject(setState);
    const toggleStartPeriod = useToggleStartPeriod(setState);
    const toggleDeadlinePeriod = useToggleDeadlinePeriod(setState);

    const value: FilterContextValue = useMemo(
        () => ({
            ...state,
            toggleProject,
            toggleTag,
            toggleStartPeriod,
            toggleDeadlinePeriod,
        }),
        [
            state,
            toggleDeadlinePeriod,
            toggleProject,
            toggleStartPeriod,
            toggleTag,
        ],
    );

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};

export function useFilterContext(): FilterContextValue {
    return useContext(FilterContext);
}
