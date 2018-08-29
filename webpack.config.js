const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'backend.js'
  },
  mode: 'production'
};