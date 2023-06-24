import { FC } from 'react';
import Filter from '../../primitives/Filter';
import useResolveDeadlinePeriodsAndCounts from './hooks/useResolveDeadlinePeriodsAndCounts';
import { useFilterContext } from '../../context/filter/FilterContext';

const DeadlinePeriodFilter: FC = () => {
    const deadlinePeriodsAndCounts = useResolveDeadlinePeriodsAndCounts();

    const { toggleDeadlinePeriod, hiddenDeadlinePeriods } = useFilterContext();

    const deadlinePeriods = Object.keys(deadlinePeriodsAndCounts) as Array<
        keyof typeof deadlinePeriodsAndCounts
    >;

    return (
        <div>
            <Filter.Heading>Deadline</Filter.Heading>
            <Filter.List>
                {deadlinePeriods.map((deadlinePeriod) => {
                    const count = deadlinePeriodsAndCounts[deadlinePeriod];

                    return (
                        <Filter.ListItem key={deadlinePeriod}>
                            <Filter.Label>
                                <input
                                    type="radio"
                                    checked={
                                        !hiddenDeadlinePeriods.includes(
                                            deadlinePeriod,
                                        )
                                    }
                                    onChange={() =>
                                        toggleDeadlinePeriod(deadlinePeriod)
                                    }
                                />
                                {deadlinePeriod}
                                <Filter.Count>{count}</Filter.Count>
                            </Filter.Label>
                        </Filter.ListItem>
                    );
                })}
            </Filter.List>
        </div>
    );
};

export default DeadlinePeriodFilter;
