module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'jest': true,
    'node': true
  },
  'extends': [
    'airbnb-base',
    'prettier',
    'eslint:recommended',
    "plugin:@typescript-eslint/recommended",
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
    'project': './tsconfig.json'
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'rules': {
    'linebreak-style': 'off',
    'no-console': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/dot-notation': ['error', {'allowPrivateClassPropertyAccess': true}],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'ts': 'never'
      }
    ],
    'no-undef': [
      'error',
      {
        'typeof': true
      }
    ],
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 2,
    'import/no-duplicates': [
      'error',
      {
        'considerQueryString': true
      }
    ],
    '@typescript-eslint/indent': [
      'error',
      2
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        'allowExpressions': true
      }
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        'exceptions': []
      }
    ],
    'space-in-parens': [
      'error',
      'always',
      {
        'exceptions': [
          '{}',
          '[]',
          '()'
        ]
      }
    ],
    'no-plusplus': [
      'error',
      {
        'allowForLoopAfterthoughts': true
      }
    ],
    'prefer-destructuring': [
      'error',
      {
        'VariableDeclarator': {
          'array': false,
          'object': true
        },
        'AssignmentExpression': {
          'array': false,
          'object': true
        }
      },
      {
        'enforceForRenamedProperties': false
      }
    ],
    'quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true
      }
    ],
    'import/first': 'error',
    'max-len': [
      'error',
      {
        'code': 120,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true
      }
    ],
    'semi': "off",
    'eol-last': ['error', 'always'],
    'import/no-self-import': 'error',
    'import/exports-last': 'error',
    'import/no-named-export': 'off',
    'camelcase': ['error', { 'ignoreDestructuring': true, 'properties': 'never' }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'vars': 'all', 'args': 'none', 'ignoreRestSiblings': false }],
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'custom': {
          'regex': '^I[A-Z]',
          'match': true
        }
      }
    ],
    'import/order': ['error', {
      'newlines-between': 'always-and-inside-groups',
      groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object'],
      alphabetize: {
        order: 'asc', /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
        caseInsensitive: true /* ignore case. Options: [true, false] */
      }
    }],

    // enforces return statements in callbacks of array's methods
    // https://eslint.org/docs/rules/array-callback-return
    'array-callback-return': ['error', { allowImplicit: true }],

    // disallow redundant `return await`
    'no-return-await': 'error',

    // disallow use of assignment in return statement
    'no-return-assign': ['error', 'always'],

    // disallow comparisons where both sides are exactly the same
    'no-self-compare': 'error',

    // disallow use of comma operator
    'no-sequences': 'error',

    // restrict what can be thrown as an exception
    'no-throw-literal': 'error',

    // disallow empty functions, except for standalone funcs/arrows
    // https://eslint.org/docs/rules/no-empty-function
    'no-empty-function': ['error', {
      allow: [
        'arrowFunctions',
        'functions',
        'methods',
      ]
    }],
    // disallow else after a return in an if
    // https://eslint.org/docs/rules/no-else-return
    'no-else-return': ['error', { allowElseIf: false }],

    'no-lonely-if': 'error',

    'no-unmodified-loop-condition': 'error',

    'space-before-blocks': ['error', 'always'],

    'curly': ['error', 'all'],

    'no-await-in-loop': 'error',

    'no-cond-assign': 'error',

    'no-constant-condition': ['error', { 'checkLoops': false }],

    'no-unreachable-loop': 'error',

    'lines-between-class-members': ['error', 'always'],

    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },
      { blankLine: 'always', prev: ['case', 'default'], next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],

    'block-scoped-var': 'error',

    'no-var': 'error',

    'func-call-spacing': ['error', 'never'],

    'no-eq-null': 'error',

    'no-lone-blocks': 'error',

    '@typescript-eslint/no-explicit-any': ['warn', { 'ignoreRestArgs': false }],

    'no-console': 'off',
    'consistent-return': 'off'

  },
  'settings': {
    'import/resolver': {
      'typescript': {}
    }
  }
};
