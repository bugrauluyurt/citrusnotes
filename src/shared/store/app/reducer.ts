import { reducerFactory } from 'store/reducerFactory';

import { AppActions } from './actions';
import { Action, AppState } from './types';

export const initialState = Object.freeze<AppState>({
    locale: 'en_US',
});

const appReducer = reducerFactory(
    {
        [AppActions.SET_LOCALE]: (state: AppState, action: Action) => {
            return { ...state, locale: action.payload };
        },
    },
    initialState
);

export default appReducer;
