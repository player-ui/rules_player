const path = require('path');

module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  haste: {
    enableSymlinks: true,
  },
  watchman: false,
  passWithNoTests: true,
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      { configFile: path.join(__dirname, 'babel.config.js') },
    ],
  },
}