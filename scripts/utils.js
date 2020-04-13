const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const appDirectory = fs.realpathSync(process.cwd());
const dirPath = path.join(appDirectory, 'src/shared/styles/fonts');
const chalk = require('chalk');
const _includes = require('lodash/includes');
const _forEach = require('lodash/forEach');
const _isEmpty = require('lodash/isEmpty');
const _replace = require('lodash/replace');

const logMessage = (message, level = 'info') => {
    const color =
        level === 'error'
            ? 'red'
            : level === 'warning'
            ? 'yellow'
            : level === 'info'
            ? 'blue'
            : 'white';
    console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

const compilerPromise = (name, compiler) => {
    return new Promise((resolve, reject) => {
        compiler.hooks.compile.tap(name, () => {
            logMessage(`[${name}] Compiling `);
        });
        compiler.hooks.done.tap(name, (stats) => {
            if (!stats.hasErrors()) {
                return resolve();
            }
            return reject(`Failed to compile ${name}`);
        });
    });
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const clientOnly = () => process.argv.includes('--client-only');

// Create fonts.css
const Fonts = {
    HELVETICA_NEUE: 'Helvetica Neue',
    ROBOTO: 'Roboto',
    SEGOE_UI: 'Segoe UI',
    ARIAL: 'Arial',
};

const FontWeights = {
    NORMAL: 'normal',
    MEDIUM: '500',
    BOLD: '600',
};

const getFontFamilyFromFileName = (fileName) => {
    if (_includes(fileName, 'roboto')) {
        return Fonts.ROBOTO;
    }
    if (_includes(fileName, 'helveticaneue')) {
        return Fonts.HELVETICA_NEUE;
    }
    if (_includes(fileName, 'segoe')) {
        return Fonts.SEGOE_UI;
    }
    return Fonts.ARIAL;
};

const getFontWeightFromFileName = (fileName) => {
    if (_includes(fileName, 'medium')) {
        return FontWeights.MEDIUM;
    }
    if (_includes(fileName, 'bold')) {
        return FontWeights.BOLD;
    }
    return FontWeights.NORMAL;
};

const getFontCssText = (fontFamily, fileName, filePath) => {
    return `@font-face {font-family: '${fontFamily}';font-style: normal;font-weight: ${getFontWeightFromFileName(
        fileName
    )};src: url('${filePath}') format('woff');}`;
};

const createFontsCss = async () => {
    const manifestPath = `${appDirectory}/build/client/static/manifest.json`;
    let fileNames = [];
    let manifestBuffer;
    try {
        fileNames = await readdir(dirPath);
        manifestBuffer = await readFile(manifestPath);
    } catch (error) {
        logMessage(error, 'error');
    }
    if (_isEmpty(fileNames)) {
        return Promise.resolve();
    }
    if (!manifestBuffer) {
        logMessage('manifest.json is not detected', 'error');
        return;
    }
    const parsedManifest = JSON.parse(manifestBuffer.toString('utf8'));
    return new Promise((resolve) => {
        let fontsCssText = '';
        const clientBuild = path.resolve(appDirectory, 'build/client');
        _forEach(fileNames, (fileName) => {
            if (/\.woff$/.test(fileName)) {
                const fontFamily = getFontFamilyFromFileName(fileName);
                const filePath = parsedManifest['assets/' + fileName];
                fontsCssText += getFontCssText(fontFamily, fileName, filePath);
            }
        });
        // Write fonts.css file
        fs.writeFile(`${clientBuild}/static/fonts.css`, fontsCssText, () =>
            logMessage('Fonts.css created successfully', 'none')
        );
        // Update manifest file
        parsedManifest['fonts.css'] = _replace(parsedManifest['bundle.css'], 'bundle', 'fonts');
        fs.writeFile(`${clientBuild}/static/manifest.json`, JSON.stringify(parsedManifest), () => {
            logMessage('Updated manifest file with fonts.css successfully', 'none');
            resolve();
        });
    });
};

module.exports = {
    clientOnly,
    compilerPromise,
    logMessage,
    sleep,
    createFontsCss,
};
