import { FC } from 'react';
import { useFilterContext } from '../../context/filter/FilterContext';
import useResolveProjectsAndCounts from './hooks/useResolveProjectsAndCounts';
import Filter from '../../primitives/Filter';
import ProjectLabel from './components/ProjectLabel';

const ProjectFilter: FC = () => {
    const projectsAndCounts = useResolveProjectsAndCounts();

    const { toggleProject, hiddenProjects } = useFilterContext();

    if (Object.entries(projectsAndCounts).length === 0) {
        return null;
    }

    const projects = Object.keys(projectsAndCounts) as Array<
        keyof typeof projectsAndCounts
    >;

    return (
        <div>
            <Filter.Heading>Projects</Filter.Heading>
            <Filter.List>
                {projects.map((project) => {
                    const count = projectsAndCounts[project];

                    return (
                        <Filter.ListItem key={project}>
                            <Filter.Label>
                                <input
                                    type="checkbox"
                                    checked={!hiddenProjects.includes(project)}
                                    onChange={() =>
                                        toggleProject(project, false)
                                    }
                                />
                                <ProjectLabel project={project} />{' '}
                                <Filter.Separator />
                                <Filter.FocusButton
                                    onClick={() => toggleProject(project, true)}
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

export default ProjectFilter;
