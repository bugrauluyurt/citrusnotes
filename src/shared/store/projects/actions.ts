import { Action } from 'store/app/types';
import { IProject } from 'types/Project';

export enum ProjectsActions {
    FETCH_PROJECTS = 'PROJECTS::FETCH_PROJECTS',
    FETCH_PROJECTS_SUCCESS = 'PROJECTS::FETCH_PROJECTS_SUCCESS',
    FETCH_PROJECTS_ERROR = 'PROJECTS::FETCH_PROJECTS_ERROR',
}

// Fetch User
export const fetchProjects = (companyId: number): Action => {
    return { type: ProjectsActions.FETCH_PROJECTS, payload: companyId };
};

export const fetchProjectsSuccess = (projects: IProject[]): Action => {
    return { type: ProjectsActions.FETCH_PROJECTS_SUCCESS, payload: projects };
};

export const fetchProjectsError = (error: any): Action => {
    return { type: ProjectsActions.FETCH_PROJECTS_ERROR, payload: error };
};
