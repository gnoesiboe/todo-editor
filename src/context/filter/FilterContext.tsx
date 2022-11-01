import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';

export type FilterContextValue = {
    hiddenProjects: string[];
    hiddenTags: string[];
    toggleProject: (project: string) => void;
    toggleTag: (tag: string) => void;
};

const FilterContext = createContext<FilterContextValue>({
    hiddenProjects: [],
    hiddenTags: [],
    toggleProject: () => {},
    toggleTag: () => {},
});

export const FilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<
        Pick<FilterContextValue, 'hiddenProjects' | 'hiddenTags'>
    >({
        hiddenProjects: [],
        hiddenTags: [],
    });

    const toggleProject = useCallback((projectToToggle: string) => {
        setState((currentState) => {
            const newHiddenProjects = currentState.hiddenProjects.includes(
                projectToToggle,
            )
                ? currentState.hiddenProjects.filter(
                      (cursorProject) => cursorProject !== projectToToggle,
                  )
                : [...currentState.hiddenProjects, projectToToggle];

            return { ...currentState, hiddenProjects: newHiddenProjects };
        });
    }, []);

    const toggleTag = useCallback((tagToToggle: string) => {
        setState((currentState) => {
            const newHiddenTags = currentState.hiddenTags.includes(tagToToggle)
                ? currentState.hiddenTags.filter(
                      (cursorTag) => cursorTag !== tagToToggle,
                  )
                : [...currentState.hiddenTags, tagToToggle];

            return { ...currentState, hiddenTags: newHiddenTags };
        });
    }, []);

    const value: FilterContextValue = useMemo(
        () => ({
            ...state,
            toggleProject,
            toggleTag,
        }),
        [state, toggleProject, toggleTag],
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
