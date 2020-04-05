import React from 'react';
import ReactDOM, { hydrate } from 'react-dom';
import { createEpicMiddleware } from 'redux-observable';
import { loadableReady } from '@loadable/component';
import { routerMiddleware } from 'connected-react-router';
import { Store } from 'redux';
import { Action } from 'store/app/types';
import { RootState } from 'store/rootReducer';
import rootEpic from 'store/rootEpic';
import generateI18next from 'i18n/I18nGenerator';
import UserServiceInstance from 'services/UserService';
import { User } from 'store/user/types';
import { fetchUserSuccess } from 'store/user/actions';
import Root from '../shared/Root';
import { configureStore } from '../shared/store';
import createHistory from '../shared/store/history';

const rootAppElement = document.getElementById('app');

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();
const history = createHistory();
const store = configureStore({
    initialState: window.__PRELOADED_STATE__ || {},
    middleware: [routerMiddleware(history), epicMiddleware],
    history,
});

generateI18next(__BROWSER__)
    .then(() => UserServiceInstance.getUser().catch(() => undefined))
    .then((sessionUser: User | undefined) => {
        let render = async (presetStore?: Store) => {
            await loadableReady(() => {
                epicMiddleware.run(rootEpic);
                const generatedStore = presetStore || store;
                if (sessionUser) {
                    generatedStore.dispatch(fetchUserSuccess(sessionUser));
                }
                hydrate(<Root store={generatedStore} history={history} />, rootAppElement);
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
                module.hot.accept('../shared/Root', () => {
                    setTimeout(render);
                });
                // @ts-ignore
                // module.hot.accept('../shared/store/rootReducer', () =>
                //     store.replaceReducer(require('../shared/store/rootReducer').default)
                // );
            }
        }
        render();
    });
