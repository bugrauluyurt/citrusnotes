import { createSelector } from 'reselect';
import _filter from 'lodash/filter';
import { ProjectsState } from 'store/projects/types';
import { IProject } from 'types/Project';

export const projects = (state: ProjectsState): IProject[] => state.activeProjects;

export const getActiveProjects = createSelector([projects], (projects: IProject[]) =>
    _filter(projects, (project: IProject) => project.active)
);
