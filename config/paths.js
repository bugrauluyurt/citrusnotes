const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
    appHtml: resolvePath('config/webpack.config.js/template.html'),
    clientBuild: resolvePath('build/client'),
    serverBuild: resolvePath('build/server'),
    dotenv: resolvePath('.env'),
    src: resolvePath('src'),
    srcClient: resolvePath('src/client'),
    srcServer: resolvePath('src/server'),
    srcShared: resolvePath('src/shared'),
    types: resolvePath('node_modules/@types'),
    locales: resolvePath('src/shared/i18n/locales'),
    scssResources: resolvePath('src/shared/styles/main.scss'),
    publicPath: '/static/',
};

paths.resolveModules = [
    paths.srcClient,
    paths.srcServer,
    paths.srcShared,
    paths.src,
    'node_modules',
];

module.exports = paths;
