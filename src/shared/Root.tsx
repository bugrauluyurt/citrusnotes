import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import IntlProvider from 'i18n/IntlProvider';
import App from 'App';
import './styles/main.global.css';

interface Props {
    store: Store;
    history: any;
    helmetContext?: any;
}

const Root: React.FC<Props> = ({ store, history, helmetContext = {} }) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <IntlProvider>
                    <HelmetProvider context={helmetContext || {}}>
                        <App />
                    </HelmetProvider>
                </IntlProvider>
            </ConnectedRouter>
        </Provider>
    );
};

export default Root;
