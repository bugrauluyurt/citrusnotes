import { combineEpics, ActionsObservable, StateObservable } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import { Action } from 'store/app/types';
import { LoggerService } from 'services/LoggerService';
import userEpics from './user/epics';
import projectsEpics from './projects/epics';

const epics = [...userEpics, ...projectsEpics];
const rootEpic = (
    action$: ActionsObservable<Action>,
    store$: StateObservable<any>,
    dependencies: any
) => {
    return combineEpics(...epics)(action$, store$, dependencies).pipe(
        catchError((error, source) => {
            LoggerService.log(error, 'error');
            return source;
        })
    );
};

export default rootEpic;
