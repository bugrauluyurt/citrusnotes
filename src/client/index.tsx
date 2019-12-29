import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { createEpicMiddleware } from 'redux-observable';
import { loadableReady } from '@loadable/component';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { Action } from 'store/app/types';
import { RootState } from 'store/rootReducer';
import rootEpic from 'store/rootEpic';
import { configureStore } from '../shared/store';
import App from '../shared/App';
import IntlProvider from '../shared/i18n/IntlProvider';
import createHistory from '../shared/store/history';

loadableReady(() => {
    const history = window.browserHistory || createHistory();
    const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();
    // Create/use the store
    // history MUST be passed here if you want syncing between server on initial route
    const store =
        window.store ||
        configureStore({
            initialState: window.__PRELOADED_STATE__,
            middleware: [routerMiddleware(history), epicMiddleware],
            history,
        });
    console.log(store);
    epicMiddleware.run(rootEpic);

    hydrate(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <IntlProvider>
                    <HelmetProvider>
                        <App />
                    </HelmetProvider>
                </IntlProvider>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('app')
    );
}).then(() => console.log('[Loadable] Components ready'));

if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    if (module.hot) {
        // @ts-ignore
        module.hot.accept();
    }
    // if (!window.store) {
    //     window.store = store;
    // }
}
