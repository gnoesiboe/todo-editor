import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import useResolveTagsAndCounts from '../../hooks/useResolveTagsAndCounts';
import isEqual from 'lodash/isEqual';
import useToggleProject from './hooks/useToggleProject';
import useToggleTag from './hooks/useToggleTag';
import { StartPeriod } from '../../features/startPeriodFilter/useResolveStartPeriodsAndCounts';
import useToggleStartPeriod from './hooks/useToggleStartPeriod';

export type FilterContextValue = {
    hiddenProjects: string[];
    hiddenTags: string[];
    hiddenStartPeriods: StartPeriod[];
    toggleProject: (project: string, reverse: boolean) => void;
    toggleTag: (tag: string, reverse: boolean) => void;
    toggleStartPeriod: (startPeriod: StartPeriod) => void;
};

const FilterContext = createContext<FilterContextValue>({
    hiddenProjects: [],
    hiddenTags: [],
    hiddenStartPeriods: [],
    toggleProject: () => {},
    toggleTag: () => {},
    toggleStartPeriod: () => {},
});

export const FilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<
        Pick<
            FilterContextValue,
            'hiddenProjects' | 'hiddenTags' | 'hiddenStartPeriods'
        >
    >({
        hiddenProjects: [],
        hiddenTags: [],
        hiddenStartPeriods: ['today', 'this week', 'this month'],
    });

    const toggleTag = useToggleTag(setState);
    const toggleProject = useToggleProject(setState);
    const toggleStartPeriod = useToggleStartPeriod(setState);

    const value: FilterContextValue = useMemo(
        () => ({
            ...state,
            toggleProject,
            toggleTag,
            toggleStartPeriod,
        }),
        [state, toggleProject, toggleStartPeriod, toggleTag],
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
