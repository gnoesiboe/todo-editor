import { FC } from 'react';
import Filter from '../../primitives/Filter';
import useResolveStartPeriodsAndCounts from './useResolveStartPeriodsAndCounts';
import { useFilterContext } from '../../context/filter/FilterContext';

const StartPeriodFilter: FC = () => {
    const startPeriodAndCounts = useResolveStartPeriodsAndCounts();

    const { toggleStartPeriod, hiddenStartPeriods } = useFilterContext();

    const startPeriods = Object.keys(startPeriodAndCounts) as Array<
        keyof typeof startPeriodAndCounts
    >;

    return (
        <div>
            <Filter.Heading>Start</Filter.Heading>
            <Filter.List>
                {startPeriods.map((startPeriod) => {
                    const count = startPeriodAndCounts[startPeriod];

                    return (
                        <Filter.ListItem key={startPeriod}>
                            <Filter.Label>
                                <input
                                    type="radio"
                                    checked={
                                        !hiddenStartPeriods.includes(
                                            startPeriod,
                                        )
                                    }
                                    onChange={() =>
                                        toggleStartPeriod(startPeriod)
                                    }
                                />
                                {startPeriod}
                                <Filter.Count>{count}</Filter.Count>
                            </Filter.Label>
                        </Filter.ListItem>
                    );
                })}
            </Filter.List>
        </div>
    );
};

export default StartPeriodFilter;
