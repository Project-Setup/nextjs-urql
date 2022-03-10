/** @type {import('prettier').Config} */
module.exports = {
  tabWidth: 2,
  overrides: [
    {
      files: '*.md',
      options: {
        tabWidth: 4
      }
    }
  ],
  semi: true,
  singleQuote: true,
  printWidth: 80,
  trailingComma:  'es5',
};
