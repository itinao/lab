const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/ts/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/assets/js')
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
    }],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};
