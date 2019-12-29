import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { AppState } from 'store/app/types';
import userReducer from 'store/user/reducer';
import { UserState } from 'store/user/types';
import appReducer from './app/reducer';

export interface RouteState {
    location: any;
}

export type RootState = {
    router: RouteState;
    app: AppState;
    user: UserState;
};

const createRootReducer = (history: any) =>
    combineReducers({
        router: connectRouter(history),
        app: appReducer,
        user: userReducer,
    });

export default createRootReducer;
