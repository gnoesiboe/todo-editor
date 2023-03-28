import { FC } from 'react';
import { noTagsKey } from '../hooks/useResolveTagsAndCounts';

type Props = {
    tag: string;
};

const TagLabel: FC<Props> = ({ tag }) => {
    if (tag === noTagsKey) {
        return <i>no tags</i>;
    }

    return <>{tag.replace(/^@/, '')}</>;
};

export default TagLabel;
