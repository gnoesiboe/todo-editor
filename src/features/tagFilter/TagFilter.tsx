import { FC } from 'react';
import useResolveTags from './hooks/useResolveTags';
import { useFilterContext } from '../../context/filter/FilterContext';
import Filter from '../../primitives/Filter';

const TagFilter: FC = () => {
    const tagsAndCounts = useResolveTags();

    const { hiddenTags, toggleTag } = useFilterContext();

    if (tagsAndCounts.length === 0) {
        return null;
    }

    const tags = Object.keys(tagsAndCounts) as Array<
        keyof typeof tagsAndCounts
    >;

    return (
        <div>
            <Filter.Heading>Tags</Filter.Heading>
            <Filter.List>
                {tags.map((tag) => {
                    const count = tagsAndCounts[tag];

                    return (
                        <Filter.ListItem key={tag}>
                            <Filter.Label>
                                <input
                                    type="checkbox"
                                    checked={!hiddenTags.includes(tag)}
                                    onChange={() => toggleTag(tag)}
                                />
                                {tag.replace(/^@/, '')}{' '}
                                <Filter.Count>{count}</Filter.Count>
                            </Filter.Label>
                        </Filter.ListItem>
                    );
                })}
            </Filter.List>
        </div>
    );
};

export default TagFilter;
