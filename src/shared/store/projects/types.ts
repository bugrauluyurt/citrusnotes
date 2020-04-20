import { IProject } from 'types/Project';

export type ProjectsState = Readonly<{
    activeProjects: IProject[];
    activeProject?: IProject;
    loading: boolean;
}>;
