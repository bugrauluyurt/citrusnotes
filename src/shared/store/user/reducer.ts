import produce from 'immer';
import { Action } from 'store/app/types';
import { UserActions } from './actions';
import { UserState } from './types';

export const initialState = Object.freeze<UserState>({
    data: null,
    loading: false,
    error: null,
});

export default (state: UserState = initialState, action: Action): UserState =>
    produce(state, (draft) => {
        switch (action.type) {
            case UserActions.FETCH_USER: {
                draft.loading = true;
                draft.error = null;
                return;
            }
            case UserActions.FETCH_USER_SUCCESS: {
                draft.loading = false;
                draft.error = null;
                draft.data = action.payload;
                return;
            }
            case UserActions.FETCH_USER_ERROR: {
                draft.loading = false;
                draft.error = action.payload;
                draft.data = null;
                return;
            }
            case UserActions.LOGIN_USER: {
                draft.loading = true;
                draft.error = null;
                return;
            }
            case UserActions.REGISTER_USER: {
                draft.loading = true;
                draft.error = null;
                return;
            }
            case UserActions.USER_AUTHENTICATION_SUCCESS: {
                draft.loading = false;
                draft.error = null;
                draft.data = action.payload;
                return;
            }
            case UserActions.USER_AUTHENTICATION_ERROR: {
                draft.loading = false;
                draft.error = action.payload;
                draft.data = null;
                return;
            }
            case UserActions.DISABLE_ERROR: {
                draft.error = null;
                return;
            }
        }
    });
