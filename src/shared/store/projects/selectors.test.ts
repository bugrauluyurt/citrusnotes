import { getActiveProjects } from './selectors';
import { initialState } from './reducer';
import { Project } from './data.test';

const state = { ...initialState, projects: [Project] };

describe('Project Selectors', () => {
    it('gets active projects', () => {
        const projects = getActiveProjects(state);
        expect(projects).toBe([]);
    });
});
