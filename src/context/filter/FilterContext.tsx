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
import useResolveProjectsAndCounts from '../../features/projectFilter/hooks/useResolveProjectsAndCounts';

export type FilterContextValue = {
    hiddenProjects: string[];
    hiddenTags: string[];
    toggleProject: (project: string, reverse: boolean) => void;
    toggleTag: (tag: string, reverse: boolean) => void;
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

    const tagsAndCounts = useResolveTagsAndCounts();
    const allTags = Object.keys(tagsAndCounts);

    const projectsAndCounts = useResolveProjectsAndCounts();
    const allProjects = Object.keys(projectsAndCounts);

    const toggleProject = useCallback(
        (projectToToggle: string, reverse: boolean) => {
            setState((currentState) => {
                if (reverse) {
                    const allButProjectToToggle = allProjects.filter(
                        (cursorProject) => cursorProject !== projectToToggle,
                    );

                    const currentlyAllButProjectToToggle = isEqual(
                        allButProjectToToggle,
                        currentState.hiddenProjects,
                    );

                    console.log(
                        'all but project to toggle',
                        allButProjectToToggle,
                        currentlyAllButProjectToToggle,
                    );

                    const newHiddenProjects = currentlyAllButProjectToToggle
                        ? [projectToToggle]
                        : allButProjectToToggle;

                    console.log('new hidden', newHiddenProjects);

                    return {
                        ...currentState,
                        hiddenProjects: newHiddenProjects,
                    };
                } else {
                    const newHiddenProjects =
                        currentState.hiddenProjects.includes(projectToToggle)
                            ? currentState.hiddenProjects.filter(
                                  (cursorProject) =>
                                      cursorProject !== projectToToggle,
                              )
                            : [...currentState.hiddenProjects, projectToToggle];

                    return {
                        ...currentState,
                        hiddenProjects: newHiddenProjects,
                    };
                }
            });
        },
        [allProjects],
    );

    const toggleTag = useCallback(
        (tagToToggle: string, reverse: boolean) => {
            setState((currentState) => {
                if (reverse) {
                    const allButTagToToggle = allTags.filter(
                        (cursorTag) => cursorTag !== tagToToggle,
                    );

                    const currentlyAllButTagToToggle = isEqual(
                        allButTagToToggle,
                        currentState.hiddenTags,
                    );

                    const newHiddenTags = currentlyAllButTagToToggle
                        ? [tagToToggle]
                        : allButTagToToggle;

                    return { ...currentState, hiddenTags: newHiddenTags };
                } else {
                    const newHiddenTags = currentState.hiddenTags.includes(
                        tagToToggle,
                    )
                        ? currentState.hiddenTags.filter(
                              (cursorTag) => cursorTag !== tagToToggle,
                          )
                        : [...currentState.hiddenTags, tagToToggle];

                    return { ...currentState, hiddenTags: newHiddenTags };
                }
            });
        },
        [allTags],
    );

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
