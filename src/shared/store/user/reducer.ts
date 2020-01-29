import { createReducer } from 'store/reducerFactory';

import { Action } from 'store/app/types';
import { UserActions } from './actions';
import { User, UserState } from './types';

export const initialState = Object.freeze<UserState>({
    data: null,
    isAnonymous: true,
    loading: false,
    error: null,
});

const userReducer = createReducer(
    {
        [UserActions.FETCH_USER]: (state: UserState): UserState => {
            return { ...state, loading: true, error: null };
        },
        [UserActions.FETCH_USER_SUCCESS]: (state: UserState, action: Action): UserState => {
            return { ...state, loading: false, error: null, data: action.payload as User };
        },
        [UserActions.FETCH_USER_ERROR]: (state: UserState, action: Action): UserState => {
            return { ...state, loading: false, data: null, error: action.payload };
        },
        [UserActions.LOGIN_USER]: (state: UserState): UserState => {
            return { ...state, loading: true, error: null };
        },
        [UserActions.REGISTER_USER]: (state: UserState): UserState => {
            return { ...state, loading: true, error: null };
        },
        [UserActions.USER_AUTHENTICATION_SUCCESS]: (
            state: UserState,
            action: Action
        ): UserState => {
            return { ...state, loading: false, error: null, data: action.payload as User };
        },
        [UserActions.USER_AUTHENTICATION_ERROR]: (state: UserState, action: Action): UserState => {
            return { ...state, loading: false, error: action.payload, data: null };
        },
    },
    initialState
);

export default userReducer;
