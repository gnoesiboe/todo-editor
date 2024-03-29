import { FilterContextValue } from '../FilterContext';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { allStartPeriods } from '../../../features/startPeriodFilter/hooks/useResolveStartPeriodsAndCounts';

export default function useToggleStartPeriod(
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
): FilterContextValue['toggleStartPeriod'] {
    return useCallback(
        (startPeriodToToggle) => {
            setState((currentState) => {
                const newHidden = allStartPeriods.filter((item) => {
                    return item !== startPeriodToToggle;
                });

                return {
                    ...currentState,
                    hiddenStartPeriods: newHidden,
                };
            });
        },
        [setState],
    );
}
