import { FC } from 'react';
import useExtractMatchesFromEditorState from '../../hooks/useExtractMatchesFromEditorState';

const TagOverview: FC = () => {
    const tags = useExtractMatchesFromEditorState(/@[^ ]+/g);

    return (
        <div>
            <h2 className="font-extrabold underline uppercase">Tags</h2>
            <ul className="list-inside list-disc">
                {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>
        </div>
    );
};

export default TagOverview;
