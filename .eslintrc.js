const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];

module.exports = {
  extends: [
    '@postmates',
    'prettier',
    'prettier/react',
    'prettier/standard',
    'prettier/@typescript-eslint',
  ],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    'import/extensions': extensions,
    'import/resolver': {
      node: { extensions },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-interface': [
      'error',
      { allowSingleExtends: true },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
    },
    {
      files: ['*.test.ts', '*.test.tsx'],
      extends: ['plugin:jest/recommended'],
      plugins: ['jest'],
      env: {
        jest: true,
        node: true,
      },
      rules: {
        // import
        'import/no-extraneous-dependencies': 'off',

        // jest
        'jest/prefer-to-be-null': 'error',
        'jest/prefer-to-be-undefined': 'error',
        'jest/prefer-to-have-length': 'error',
      },
    },
  ],
};
