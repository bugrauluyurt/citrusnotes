import { Epic, ofType } from 'redux-observable';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
    fetchUserError,
    fetchUserSuccess,
    UserActions,
    userAuthenticationError,
    userAuthenticationSuccess,
} from 'store/user/actions';
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
        map((response: User | Error) => {
            return response instanceof Error
                ? fetchUserError(response.message)
                : fetchUserSuccess(response);
        })
    );

const authenticateUserEpic: Epic<Action, Action, RootState> = (
    action$: Observable<Action>,
    state$: Observable<RootState>
) =>
    action$.pipe(
        ofType(UserActions.LOGIN_USER, UserActions.REGISTER_USER),
        withLatestFrom(state$),
        // result comes with recent state [action, state]
        switchMap(([action]: [Action, RootState]) => {
            const params = action.payload;
            return params.username
                ? UserServiceInstance.registerUser(params)
                : UserServiceInstance.loginUser(params);
        }),
        map((response: User | Error) => {
            return response instanceof Error
                ? userAuthenticationError(response.message)
                : userAuthenticationSuccess(response);
        })
    );

export default [fetchUserEpic, authenticateUserEpic];
