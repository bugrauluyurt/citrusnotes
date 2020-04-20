import { Epic, ofType } from 'redux-observable';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { epicResponseHandler } from 'store/epicResponseHandler';
import ProjectsServiceInstance from 'services/ProjectsService';
import { IProject } from 'types/Project';
import { fetchProjectsError, fetchProjectsSuccess, ProjectsActions } from 'store/projects/actions';
import { Action } from '../app/types';
import { RootState } from '../rootReducer';

const fetchProjectsEpic: Epic<Action, Action, RootState> = (
    action$: Observable<Action>,
    state$: Observable<RootState>
) =>
    action$.pipe(
        ofType(ProjectsActions.FETCH_PROJECTS),
        withLatestFrom(state$),
        // result comes with recent state [action, state]
        switchMap(([action]: [Action, RootState]) => {
            const companyId = action.payload;
            return ProjectsServiceInstance.getProjects(companyId, true);
        }),
        map((response: IProject[] | Error) => {
            return epicResponseHandler(response, [fetchProjectsSuccess, fetchProjectsError]);
        })
    );

export default [fetchProjectsEpic];
