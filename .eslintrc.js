const paths = require('./config/paths');

module.exports = {
    extends: ['wiremore', 'wiremore/react', 'wiremore/typescript'],
    globals: {
        __BROWSER__: true,
        __SERVER__: true,
    },
    settings: {
        'import/resolver': {
            node: {
                paths: paths.resolveModules,
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
        'react': {
            version: 'detect',
        },
    },
    plugins: ['react-hooks'],
    rules: {
        'import/no-unassigned-import': 0,
        'import/no-named-as-default-member': 0,
        'prettier/prettier': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
    overrides: [
        {
            files: ['*.tsx'],
            rules: {
                // TODO: add to eslint-config-wiremore
                'import/named': 0,
                'react/prop-types': 0,
            },
        },
    ],
};
