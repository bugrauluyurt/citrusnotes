import { createReducer } from 'store/reducerFactory';

import { AppActions } from './actions';
import { Action, AppState } from './types';

export const initialState = Object.freeze<AppState>({
    locale: 'en_US',
});

const appReducer = createReducer(
    {
        [AppActions.SET_LOCALE]: (state: AppState, action: Action): AppState => {
            return { ...state, locale: action.payload };
        },
    },
    initialState
);

export default appReducer;
