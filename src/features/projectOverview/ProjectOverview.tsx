import { FC } from 'react';
import { useFilterContext } from '../../context/filter/FilterContext';
import useResolveProjects from './hooks/useResolveProjects';
import Filter from '../../primitives/Filter';

const ProjectOverview: FC = () => {
    const projects = useResolveProjects();

    const { toggleProject, hiddenProjects } = useFilterContext();

    return (
        <div>
            <Filter.Heading>Projects</Filter.Heading>
            <Filter.List>
                {projects.map((project) => (
                    <Filter.ListItem key={project}>
                        <Filter.Label>
                            <input
                                type="checkbox"
                                checked={!hiddenProjects.includes(project)}
                                onChange={() => toggleProject(project)}
                            />
                            {project.replace(/^#/, '')}
                        </Filter.Label>
                    </Filter.ListItem>
                ))}
            </Filter.List>
        </div>
    );
};

export default ProjectOverview;
