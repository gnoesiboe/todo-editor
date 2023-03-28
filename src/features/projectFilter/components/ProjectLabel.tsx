import { FC } from 'react';
import { noProjectsKey } from '../hooks/useResolveProjectsAndCounts';

type Props = {
    project: string;
};

const ProjectLabel: FC<Props> = ({ project }) => {
    if (project === noProjectsKey) {
        return <i>no projects</i>;
    }

    return <>{project.replace(/^#/, '')}</>;
};

export default ProjectLabel;
