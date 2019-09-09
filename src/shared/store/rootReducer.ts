import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import { Action } from 'store/app/types';
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

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action: Action) {
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

const createRootReducer = () =>
    combineReducers({
        route: routeReducer,
        app: appReducer,
    });

export default createRootReducer;
