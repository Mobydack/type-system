module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 12,
    },
    overrides: [
        {
            files: ['src/**/*.ts'],
            extends: ['plugin:@typescript-eslint/recommended'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
            },
            plugins: ['@typescript-eslint'],
        },
        {
            files: 'src/**/__tests__/**',
            env: { 'jest/globals': true },
            extends: ['plugin:jest/all'],
        },
    ],
};
