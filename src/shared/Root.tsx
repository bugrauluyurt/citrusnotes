import { ConnectedRouter } from 'connected-react-router';
import { StaticRouter } from 'react-router';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import IntlProvider from 'i18n/IntlProvider';
import App from 'App';
import './styles';

interface Props {
    store: Store;
    history: any;
    helmetContext?: any;
}

const Router = (props: { [key: string]: any }): JSX.Element => {
    return __BROWSER__ ? (
        <ConnectedRouter history={props.history}>{props.children}</ConnectedRouter>
    ) : (
        <StaticRouter context={{}}>{props.children}</StaticRouter>
    );
};

const Root: React.FC<Props> = ({ store, history, helmetContext = {} }): JSX.Element => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <IntlProvider>
                    <HelmetProvider context={helmetContext || {}}>
                        <App />
                    </HelmetProvider>
                </IntlProvider>
            </Router>
        </Provider>
    );
};

export default Root;
