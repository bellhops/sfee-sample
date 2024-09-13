module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],
    'react-hooks/rules-of-hooks': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // Prettier conflicts
    // Prettier enforces these rules on commit hooks - ignore with eslint
    'max-len': 'off',
    'keyword-spacing': 'off',
    'no-trailing-spaces': 'off',
    'object-curly-newline': 'off',
    'object-curly-spacing': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'operator-linebreak': 'off',
    'newline-per-chained-call': 'off',
    // Temporary rule until more development happens and global logging
    'no-console': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
