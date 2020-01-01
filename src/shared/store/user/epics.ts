import { Epic, ofType } from 'redux-observable';
import { switchMap, withLatestFrom, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { fetchUserSuccess, UserActions, fetchUserError } from 'store/user/actions';
import { LoggerService } from 'services/LoggerService';
import UserServiceInstance from 'services/UserService';
import { Action } from '../app/types';
import { RootState } from '../rootReducer';
import { User } from './types';

const fetchUserEpic: Epic<Action, Action, RootState> = (
    action$: Observable<Action>,
    state$: Observable<RootState>
) =>
    action$.pipe(
        ofType(UserActions.FETCH_USER),
        withLatestFrom(state$),
        // result comes with recent state [action, state]
        switchMap(([action]: [Action, RootState]) => {
            const userId = action.payload;
            return UserServiceInstance.fetchUser(userId);
        }),
        map((user: User) => fetchUserSuccess(user)),
        catchError((error) => {
            LoggerService.log(error);
            return of(fetchUserError());
        })
    );

export default [fetchUserEpic];
