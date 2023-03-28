import { FC } from 'react';
import useResolveTagsAndCounts from '../../hooks/useResolveTagsAndCounts';
import { useFilterContext } from '../../context/filter/FilterContext';
import Filter from '../../primitives/Filter';
import TagLabel from './components/TagLabel';

const TagFilter: FC = () => {
    const tagsAndCounts = useResolveTagsAndCounts();

    const { hiddenTags, toggleTag } = useFilterContext();

    if (Object.entries(tagsAndCounts).length === 0) {
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
                                    onChange={() => toggleTag(tag, false)}
                                />
                                <TagLabel tag={tag} />
                                <Filter.Separator />
                                <Filter.FocusButton
                                    onClick={() => toggleTag(tag, true)}
                                />
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
