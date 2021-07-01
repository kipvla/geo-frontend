module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.tsx', '.ts', '.css'] },
    ],
    'no-use-before-define': 'off',
    'no-console': 0,
    'import/no-unresolved': 'off',
    'import/extensions': 0,
    'react/jsx-props-no-spreading': 0,
    'no-underscore-dangle': 0,
    'comma-dangle': 'off',
    'operator-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'react/jsx-filename-extension': 'off',
    'no-dupe-keys': 'off',
    'react/no-array-index-key': 'off',
  },
};
