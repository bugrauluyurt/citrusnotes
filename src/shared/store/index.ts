import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter } from 'connected-react-router';
import createRootReducer from './rootReducer';

type StoreParams = {
    initialState?: { [key: string]: any };
    middleware?: any[];
    history: History;
};

export const configureStore = ({ initialState, middleware = [], history }: StoreParams) => {
    const devtools =
        typeof window !== 'undefined' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });

    const composeEnhancers = devtools || compose;
    const rootReducer = createRootReducer(history);

    const store = createStore(
        // @ts-ignore
        connectRouter(history)(rootReducer),
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );

    if (process.env.NODE_ENV !== 'production') {
        // @ts-ignore
        if (module.hot) {
            // @ts-ignore
            module.hot.accept('./rootReducer', () =>
                store.replaceReducer(require('./rootReducer').default)
            );
        }
    }

    return store;
};

export default configureStore;
