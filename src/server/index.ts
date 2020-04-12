import path from 'path';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import cors from 'cors';
import * as express from 'express';
import manifestHelpers from 'express-manifest-helpers';
import * as _ from 'lodash';
import addHistory from 'middleware/addHistory';
import paths from '../../config/paths';
import addStore from './middleware/addStore';
import errorHandler from './middleware/errorHandler';
import { i18nextXhr, refreshTranslations } from './middleware/i18n';
import serverRenderer from './middleware/serverRenderer';
import webhookVerification from './middleware/webhookVerification';

require('dotenv').config();

const app = express.default();
const cookieParser = require('cookie-parser');

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.NODE_ENV === 'development') {
    app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)));
}

app.use(cookieParser());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/locales/refresh', webhookVerification, refreshTranslations);

// It's probably a good idea to serve these static assets with Nginx or Apache as well:
app.get('/locales/:locale/:ns.json', i18nextXhr);

app.use(addHistory);
app.use(addStore);

app.use(
    manifestHelpers({
        manifestPath: `${path.join(paths.clientBuild, paths.publicPath)}/manifest.json`,
        // Manifest path should prepended with cdn path for production
        prependPath: !_.isEmpty(process.env.CDN_PATH) ? process.env.CDN_PATH : '',
        // Cache can be only enabled for production
        cache: process.env.NODE_ENV === 'production',
    })
);

app.use(serverRenderer());

app.use(errorHandler);

// After build "node server.js" command will start the server. It will work on localhost. With Nginx reverse proxy your domain to localhost:8500
app.listen(process.env.PORT || 8500, () => {
    console.log(
        `[${new Date().toISOString()}]`,
        chalk.blue(`App is running: http://localhost:${process.env.PORT || 8500}`)
    );
});

export default app;
