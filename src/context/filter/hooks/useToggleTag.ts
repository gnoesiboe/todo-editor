import useResolveTagsAndCounts from '../../../hooks/useResolveTagsAndCounts';
import { Dispatch, SetStateAction, useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import { FilterContextValue } from '../FilterContext';

export default function useToggleTag(
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
): FilterContextValue['toggleTag'] {
    const tagsAndCounts = useResolveTagsAndCounts();
    const allTags = Object.keys(tagsAndCounts);

    return useCallback(
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
        [allTags, setState],
    );
}
