module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  'plugins': ['react'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'standard',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    jsx: "react",
    "ecmaVersion": 2015,
    useJSXTextNode: true,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  rules: {
    // JSX
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-boolean-value': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-curly-spacing': ['error', 'always'],
    'react/jsx-equals-spacing': 'error',
    'react/jsx-first-prop-new-line': 'error',
    'react/jsx-handler-names': 'error',
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-key': 'error',
    'react/jsx-max-props-per-line': ['error', { 'maximum': 3 }],
    'react/jsx-no-bind': 'off',
    'react/jsx-no-literals': 'off',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-sort-props': 'error',
    'react/jsx-space-before-closing': 'error',
    "@typescript-eslint/no-unused-vars": "off",
    'no-unused-vars': "warn",
    // "@typescript-eslint/no-unused-vars-experimental": ["error", { variables: { ignoredNamesRegex: '^_React$' } }],
    "no-use-before-define": "off",
    "no-trailing-spaces": 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    "@typescript-eslint/no-use-before-define": ["error"],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    'arrow-parens': 'off',
    'one-var': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'class-methods-use-this': 'off',
    'import/no-cycle': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    'no-param-reassign': [2, { props: false }],
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none', // 'none' or 'semi' or 'comma'
        requireLast: true
      },
      singleline: {
        delimiter: 'semi', // 'semi' or 'comma'
        requireLast: false
      }
    }],
    'function-paren-newline': ["error", { "minItems": 2 }],
    'consistent-return': 'off',
    'linebreak-style': 'off',
    'no-restricted-globals': 'off',
    'func-names': 'off',
    'no-shadow': 'off',
    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prefer-promise-reject-errors': 'off',
    'object-curly-newline': 'off',
    // TypeScript
    quotes: ['warn', 'single', { avoidEscape: true }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-unused-expressions': 'off',
    'newline-per-chained-call': ['warn'],
    'no-return-assign': ['error', 'except-parens']
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    }
  }
}
