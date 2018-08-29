const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'backend.js'
  },
  plugins: [
    new webpack.EnvironmentPlugin(['EMAIL_LOGIN', 'EMAIL_PASS', 'SLACK_TOKEN', 'EMAIL_CHANNEL_ID'])
  ]
};