import { FC } from 'react';
import useResolveTags from './hooks/useResolveTags';
import { useFilterContext } from '../../context/filter/FilterContext';
import Filter from '../../primitives/Filter';

const TagFilter: FC = () => {
    const tags = useResolveTags();

    const { hiddenTags, toggleTag } = useFilterContext();

    if (tags.length === 0) {
        return null;
    }

    return (
        <div>
            <Filter.Heading>Tags</Filter.Heading>
            <Filter.List>
                {tags.map((tag) => (
                    <Filter.ListItem key={tag}>
                        <Filter.Label>
                            <input
                                type="checkbox"
                                checked={!hiddenTags.includes(tag)}
                                onChange={() => toggleTag(tag)}
                            />
                            {tag.replace(/^@/, '')}
                        </Filter.Label>
                    </Filter.ListItem>
                ))}
            </Filter.List>
        </div>
    );
};

export default TagFilter;
