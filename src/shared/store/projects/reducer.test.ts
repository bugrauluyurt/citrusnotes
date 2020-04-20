import reducer, { initialState } from './reducer';
import { ProjectsActions } from './actions';
import { Project } from './data.test';

describe('Projects Reducer', () => {
    it('starts fetching projects', () => {
        expect(reducer(initialState, { type: ProjectsActions.FETCH_PROJECTS })).toEqual({
            activeProjects: [],
            activeProject: undefined,
            loading: true,
        });
    });
    it('sets projects and active project', () => {
        expect(
            reducer(initialState, {
                type: ProjectsActions.FETCH_PROJECTS_SUCCESS,
                payload: [Project],
            })
        ).toEqual({
            activeProjects: [Project],
            activeProject: Project,
            loading: false,
        });
    });
    it('empties user after error', () => {
        expect(
            reducer(initialState, { type: ProjectsActions.FETCH_PROJECTS_ERROR, payload: null })
        ).toEqual({
            activeProjects: [],
            activeProject: undefined,
            loading: false,
        });
    });
});
