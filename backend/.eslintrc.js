module.exports = {
    extends: ['eslint:recommended', 'prettier'], // extending recommended config and config derived from eslint-config-prettier
    plugins: ['prettier'], // activating esling-plugin-prettier (--fix stuff)
    rules: {
      'prettier/prettier': [ // customizing prettier rules (unfortunately not many of them are customizable)
        'error',
        {
          singleQuote: true, 
          trailingComma: 'none',
          useTabs: true,
          tabWidth: 2
        },
      ],
      eqeqeq: ['error', 'always'], // adding some custom ESLint rules
      'no-console': 'off'
    },
    parserOptions: {
        'ecmaVersion': 2017,
        'sourceType': 'module',
        'ecmaFeatures': {
          'experimentalObjectRestSpread' : true
        }
    },
    env: {
        'es6': true,
        'node': true,
        'browser': true
    }
  };