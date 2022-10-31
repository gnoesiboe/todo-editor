import { FC } from 'react';
import useExtractMatchesFromEditorState from '../../hooks/useExtractMatchesFromEditorState';

const ProjectOverview: FC = () => {
    const projects = useExtractMatchesFromEditorState(/#[^ #]+/g);

    return (
        <div>
            <h2 className="font-extrabold underline uppercase">Projects</h2>
            <ul className="list-inside list-disc">
                {projects.map((project) => (
                    <li key={project}>{project}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectOverview;
