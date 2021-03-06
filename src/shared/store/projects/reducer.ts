import produce from 'immer';
import _get from 'lodash/get';
import { Action } from 'store/app/types';
import { ProjectsActions } from './actions';
import { ProjectsState } from './types';

export const initialState = Object.freeze<ProjectsState>({
    activeProjects: [],
    activeProject: null,
    loading: false,
});

export default (state: ProjectsState = initialState, action: Action): ProjectsState =>
    produce(state, (draft) => {
        switch (action.type) {
            case ProjectsActions.FETCH_PROJECTS: {
                draft.loading = true;
                return;
            }
            case ProjectsActions.FETCH_PROJECTS_SUCCESS: {
                draft.loading = false;
                draft.activeProjects = action.payload;
                // Selects the first project as active project, later this can use localstorage
                draft.activeProject = _get(action.payload, '0');
                return;
            }
            case ProjectsActions.FETCH_PROJECTS_ERROR: {
                draft.loading = false;
                draft.activeProjects = [];
                draft.activeProject = null;
                return;
            }
        }
    });
