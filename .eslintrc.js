module.exports = {
  root: true,
  env: {
    es2021: true
  },
  extends: ['standard', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: ['error', 'always']
  },
  overrides: [
    {
      files: '*.test.ts',
      env: { 'jest/globals': true},
      extends: ['plugin:jest/all']
    }
  ]
};
