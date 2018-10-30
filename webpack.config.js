const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'restangular.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
