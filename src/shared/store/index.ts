import { createStore, applyMiddleware, compose, Store } from 'redux';
import { connectRouter } from 'connected-react-router';
import createRootReducer from './rootReducer';

type StoreParams = {
    initialState?: { [key: string]: any };
    middleware?: any[];
    history: History;
};

export const configureStore = ({ initialState, middleware = [], history }: StoreParams): Store => {
    const devtools =
        typeof window !== 'undefined' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });

    const composeEnhancers = devtools || compose;
    const rootReducer = createRootReducer(history);

    return createStore(
        // @ts-ignore
        connectRouter(history)(rootReducer),
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );
};

export default configureStore;
