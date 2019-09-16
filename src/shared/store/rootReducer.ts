import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import { Action, AppState } from 'store/app/types';
import userReducer from 'store/user/reducer';
import { UserState } from 'store/user/types';
import appReducer from './app/reducer';

/**
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */
// Initial routing state
const routeInitialState = {
    location: null,
};

export interface RouteState {
    location: any;
}

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action: Action): RouteState {
    switch (action.type) {
        /* istanbul ignore next */
        case LOCATION_CHANGE:
            return {
                ...state,
                location: action.payload,
            };
        default:
            return state;
    }
}

export type RootState = {
    route: RouteState;
    app: AppState;
    user: UserState;
};

const createRootReducer = () =>
    combineReducers({
        route: routeReducer,
        app: appReducer,
        user: userReducer,
    });

export default createRootReducer;
