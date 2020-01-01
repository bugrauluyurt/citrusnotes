import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import App from 'App';
import IntlProvider from 'i18n/IntlProvider';

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