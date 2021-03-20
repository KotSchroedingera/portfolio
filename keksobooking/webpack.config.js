const path = require('path');

module.exports = {
    entry: {
      main: path.resolve(__dirname, './source/js/main.js'),
    },
    output: {
      path: path.resolve(__dirname, './build/js/'),
      filename: 'main.bundle.js',
    },
    devtool: 'source-map',
    mode: 'production',
}