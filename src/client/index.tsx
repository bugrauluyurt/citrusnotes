import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { routerMiddleware } from 'react-router-redux';

import { createEpicMiddleware } from 'redux-observable';
import { loadableReady } from '@loadable/component';
import { Action } from 'store/app/types';
import { RootState } from 'store/rootReducer';
import rootEpic from 'store/rootEpic';
import { configureStore } from '../shared/store';
import App from '../shared/App';
import IntlProvider from '../shared/i18n/IntlProvider';
import createHistory from '../shared/store/history';

const history = createHistory();
const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();
// Create/use the store
// history MUST be passed here if you want syncing between server on initial route
const store =
    window.store ||
    configureStore({
        initialState: window.__PRELOADED_STATE__,
        middleware: [routerMiddleware(history), epicMiddleware],
    });

epicMiddleware.run(rootEpic);

loadableReady(() => {
    hydrate(
        <Provider store={store}>
            <Router history={history}>
                <IntlProvider>
                    <HelmetProvider>
                        <App />
                    </HelmetProvider>
                </IntlProvider>
            </Router>
        </Provider>,
        document.getElementById('app')
    );
}).then(() => console.log('Loadable components ready...'));

if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept();
    }

    if (!window.store) {
        window.store = store;
    }
}
