import path from 'path';
import _get from 'lodash/get';
import * as express from 'express';
import ssrPrepass from 'react-ssr-prepass';
import { ChunkExtractor } from '@loadable/server';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Store } from 'redux';
import Root from 'Root';
import UserServiceInstance from 'services/UserService';
import { fetchUserSuccess } from 'store/user/actions';
import { User } from 'store/user/types';
import paths from '../../../config/paths';
import Html from '../components/HTML';

const helmetContext = {};
// Loadable Stats File
const loadableStatsJson = '/loadable-stats.json';
const statsFile =
    process.env.NODE_ENV === 'development'
        ? path.join(paths.clientBuild, paths.publicPath, `/${loadableStatsJson}`)
        : path.join(process.env.CDN_PATH || './', loadableStatsJson);

const getSessionUser = (headers: { [key: string]: any }): Promise<User | undefined> => {
    const requestConfig = UserServiceInstance.getRequestConfig();
    if (headers.cookie) {
        requestConfig.headers.Cookie = headers.cookie;
    }
    //@TODO memcache user here in order to prevent multiple fetching...
    return new Promise((resolve) => {
        return UserServiceInstance.getUser(requestConfig)
            .then((sessionUser) => resolve(sessionUser))
            .catch(() => resolve(undefined));
    });
};

const render = async (res: express.Response, sessionUser: User | undefined): Promise<string> => {
    if (sessionUser) {
        res.locals.store.dispatch(fetchUserSuccess(_get(sessionUser, 'data')));
    }
    const extractor = new ChunkExtractor({ statsFile, entrypoints: ['bundle'] });

    const root = (
        <Root store={res.locals.store} history={res.locals.history} helmetContext={helmetContext} />
    );
    const extractedRoot = extractor.collectChunks(root);
    await ssrPrepass(extractedRoot);

    const content = renderToString(extractedRoot);
    const loadableScriptTags = extractor.getScriptTags();
    const loadableStyleTags = extractor.getStyleTags();

    const state = JSON.stringify(res.locals.store.getState());
    const html = renderToString(
        <Html
            css={[
                // INFO => bundle and vendor files are loaded by loadable.
                //res.locals.assetPath('bundle.css'),
                //res.locals.assetPath('vendor.css'),
                res.locals.assetPath('fonts.css'),
            ]}
            scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
            helmetContext={helmetContext}
            loadableScriptTags={loadableScriptTags}
            loadableStyleTags={loadableStyleTags}
            state={state}
        >
            {content}
        </Html>
    );
    return '<!doctype html>' + html;
};

const serverRenderer: any = () => (
    // @ts-ignore
    req: express.Request & { store: Store },
    res: express.Response
) => {
    getSessionUser(req.headers)
        .then((sessionUser: User | undefined) => render(res, sessionUser))
        .then((htmlText: string) => res.send(htmlText));
};

export default serverRenderer;
