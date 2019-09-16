import { createReducer } from 'store/reducerFactory';

import { Action } from 'store/app/types';
import { UserActions } from './actions';
import { User, UserState } from './types';

export const initialState = Object.freeze<UserState>({
    user: null,
    loading: false,
});

const userReducer = createReducer(
    {
        [UserActions.FETCH_USER]: (state: UserState): UserState => {
            return { ...state, loading: true };
        },
        [UserActions.FETCH_USER_SUCCESS]: (state: UserState, action: Action): UserState => {
            return { ...state, loading: false, user: action.payload as User };
        },
        [UserActions.FETCH_USER_ERROR]: (state: UserState): UserState => {
            return { ...state, loading: false, user: null };
        },
    },
    initialState
);

export default userReducer;
