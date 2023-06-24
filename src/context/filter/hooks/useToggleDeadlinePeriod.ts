import { allDeadlinePeriods } from '../../../features/deadlinePeriodFilter/hooks/useResolveDeadlinePeriodsAndCounts';
import { FilterContextValue } from '../FilterContext';
import { Dispatch, SetStateAction } from 'react';
export default function useToggleDeadlinePeriod(
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
): FilterContextValue['toggleDeadlinePeriod'] {
    return (deadlinePeriodToToggle) => {
        setState((currentState) => {
            const newHidden = allDeadlinePeriods.filter((item) => {
                return item !== deadlinePeriodToToggle;
            });

            return {
                ...currentState,
                hiddenDeadlinePeriods: newHidden,
            };
        });
    };
}
