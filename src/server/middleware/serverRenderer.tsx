import path from 'path';
import * as React from 'react';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ChunkExtractor } from '@loadable/server';
import { ConnectedRouter } from 'connected-react-router';
import { Store } from 'redux';
import IntlProvider from '../../shared/i18n/IntlProvider';
import App from '../../shared/App';
import Html from '../components/HTML';
import paths from '../../../config/paths';

const helmetContext = {};
// Loadable Stats File
const loadableStatsJson = '/loadable-stats.json';
const statsFile =
    process.env.NODE_ENV === 'development'
        ? path.join(paths.clientBuild, paths.publicPath, `/${loadableStatsJson}`)
        : path.join(process.env.CDN_PATH || './', loadableStatsJson);

const serverRenderer: any = () => (
    // @ts-ignore
    req: express.Request & { store: Store },
    res: express.Response
) => {
    console.log('RESPONSE: ', res.locals);
    const extractor = new ChunkExtractor({ statsFile, entrypoints: ['bundle'] });
    const tsx = extractor.collectChunks(
        <Provider store={res.locals.store}>
            <ConnectedRouter history={res.locals.history}>
                <IntlProvider>
                    <HelmetProvider context={helmetContext}>
                        <App />
                    </HelmetProvider>
                </IntlProvider>
            </ConnectedRouter>
        </Provider>
    );
    const content = renderToString(tsx);
    const loadableScriptTags = extractor.getScriptTags();
    const loadableStyleTags = extractor.getStyleTags();

    const state = JSON.stringify(res.locals.store.getState());
    const html = renderToString(
        <Html
            css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
            scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
            helmetContext={helmetContext}
            loadableScriptTags={loadableScriptTags}
            loadableStyleTags={loadableStyleTags}
            state={state}
            browserHistory={res.locals.history}
        >
            {content}
        </Html>
    );
    return res.send('<!doctype html>' + html);
};

export default serverRenderer;
