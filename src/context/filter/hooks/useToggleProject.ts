import { Dispatch, SetStateAction, useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import { FilterContextValue } from '../FilterContext';
import useResolveProjectsAndCounts from '../../../features/projectFilter/hooks/useResolveProjectsAndCounts';

export default function useToggleProject(
    setState: Dispatch<
        SetStateAction<
            Pick<
                FilterContextValue,
                | 'hiddenProjects'
                | 'hiddenTags'
                | 'hiddenStartPeriods'
                | 'hiddenDeadlinePeriods'
            >
        >
    >,
): FilterContextValue['toggleProject'] {
    const projectsAndCounts = useResolveProjectsAndCounts();
    const allProjects = Object.keys(projectsAndCounts);

    return useCallback(
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

                    const newHiddenProjects = currentlyAllButProjectToToggle
                        ? [projectToToggle]
                        : allButProjectToToggle;

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
        [allProjects, setState],
    );
}
