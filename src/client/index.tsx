import React from 'react';
import ReactDOM, { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { createEpicMiddleware } from 'redux-observable';
import { loadableReady } from '@loadable/component';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { Store } from 'redux';
import { Action } from 'store/app/types';
import { RootState } from 'store/rootReducer';
import rootEpic from 'store/rootEpic';
import { configureStore } from '../shared/store';
import App from '../shared/App';
import IntlProvider from '../shared/i18n/IntlProvider';
import createHistory from '../shared/store/history';

const rootAppElement = document.getElementById('app');

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();
const history = createHistory();
const store = configureStore({
    initialState: window.__PRELOADED_STATE__,
    middleware: [routerMiddleware(history), epicMiddleware],
    history,
});

let render = async (storeFromHotReloading?: Store) => {
    await loadableReady(() => {
        epicMiddleware.run(rootEpic);
        hydrate(
            <Provider store={storeFromHotReloading || store}>
                <ConnectedRouter history={history}>
                    <IntlProvider>
                        <HelmetProvider>
                            <App />
                        </HelmetProvider>
                    </IntlProvider>
                </ConnectedRouter>
            </Provider>,
            rootAppElement
        );
    });
};

if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    if (module.hot) {
        const renderApp = render;
        const renderError = (error: Error) => {
            const RedBox = require('redbox-react');
            ReactDOM.render(<RedBox error={error} />, rootAppElement);
        };
        render = async () => {
            try {
                await renderApp(store);
            } catch (error) {
                renderError(error);
            }
        };
        // @ts-ignore
        module.hot.accept('../shared/App', () => {
            setTimeout(render);
        });
        // @ts-ignore
        // module.hot.accept('../shared/store/rootReducer', () =>
        //     store.replaceReducer(require('../shared/store/rootReducer').default)
        // );
    }
}

render();
