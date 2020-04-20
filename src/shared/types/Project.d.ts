import { ITeam } from 'types/Team';

export interface IProjectSection {}

export interface IProject {
    id: string;
    company: string;
    projectName: string;
    projectSections: IProjectSection[];
    projectType: string;
    teams: ITeam[];
    active: boolean;
}
