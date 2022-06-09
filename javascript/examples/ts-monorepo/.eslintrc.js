module.exports = {
  env: { jest: true, browser: true },

  parser: '@babel/eslint-parser',

  extends: [
    'eslint:recommended'
  ],

  plugins: [
    'jest',
  ],
}