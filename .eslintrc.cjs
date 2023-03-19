/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {

  root: true,
  parser: 'vue-eslint-parser',
  rules: {
    "import/no-extraneous-dependencies": "off",
    'import/prefer-default-export': 'off',
  },
  'extends': [
    'airbnb',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
  },
}
