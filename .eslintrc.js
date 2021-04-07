module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  'plugins': ['react'],
  extends: [
    // 'airbnb-base',
    "eslint:recommended",
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    jsx: "react",
    ecmaVersion: 6,
    ecmaFeatures: {
      "jsx": true,
      "impliedStrict": true
    },
    sourceType: "module",
    useJSXTextNode: true,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    // "space-unary-ops"  : 2,
    // 'function-call-argument-newline': ["error", "always"],
    // 'function-paren-newline': ["error", { "minItems": 2 }],
    // 'eslint max-lines-per-function': ["error", {"max": 3, "skipComments": true}],
    // 'max-nested-callbacks': ["error", 3],
    // 'implicit-arrow-linebreak': ["error", "beside"],
    // "space-before-function-paren": ["error", {
    //   "anonymous": "always",
    //   "named": "always",
    //   "asyncArrow": "always"
    // }],
    'arrow-body-style': ["error", "as-needed"],
    "indent": ["error", 2],
    'array-bracket-newline': ["error", { "minItems": 2 }],
    'array-bracket-spacing': ["error", "never", { "singleValue": true }],
    'camelcase': ["error",{ "properties": "always" }],
    'newline-per-chained-call': ["error", { "ignoreChainWithDepth": 1 }],
    'max-statements-per-line': ["error", { "max": 2 }],
    'react/display-name': "off"
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts']
    }
  }
}
