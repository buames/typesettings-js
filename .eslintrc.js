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
    // prettier
    'prettier/prettier': 'error',

    // Allow inferrence
    '@typescript-eslint/explicit-function-return-type': 'off',
    // prefer consistency
    '@typescript-eslint/no-inferrable-types': 'off',
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
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      plugins: ['jest'],
      env: { jest: true },
    },
  ],
};
