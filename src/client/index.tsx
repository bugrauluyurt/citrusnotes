import { loadableReady } from '@loadable/component';
import { routerMiddleware } from 'connected-react-router';
import _get from 'lodash/get';
import React from 'react';
import ReactDOM from 'react-dom';
import { createEpicMiddleware } from 'redux-observable';
import generateI18next from 'i18n/I18nGenerator';
import UserServiceInstance from 'services/UserService';
import { Action } from 'store/app/types';
import rootEpic from 'store/rootEpic';
import { RootState } from 'store/rootReducer';
import { fetchUserSuccess } from 'store/user/actions';
import { User } from 'store/user/types';
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
    .then(() => {
        if (window) {
            const userId = _get(window.__PRELOADED_STATE__, 'user.data.id');
            if (userId) {
                return Promise.resolve();
            }
        }
        return UserServiceInstance.getUser()
            .then((sessionUser: User | undefined) => {
                if (sessionUser) {
                    store.dispatch(fetchUserSuccess(_get(sessionUser, 'data')));
                }
            })
            .catch(() => undefined);
    })
    .then(() => {
        let render = async (isHotModule: boolean = false) => {
            const renderMethod = isHotModule ? ReactDOM.render : ReactDOM.hydrate;
            await loadableReady(() => {
                epicMiddleware.run(rootEpic);
                renderMethod(<Root store={store} history={history} />, rootAppElement);
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
                        await renderApp(true);
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
