const path = require('path');

const project = {
  base(...args) {
    return path.join(__dirname, ...args);
  },
  src(...args) {
    return this.base("src/ts/", ...args);
  },
  dist(...args) {
    return this.base("public/assets/", ...args);
  }
};

module.exports = {
  mode: 'development',
  entry: project.src('app.tsx'),
  output: {
    filename: 'bundle.js',
    path: project.dist('js')
  },
  module: {
    rules: [{
      test: /\.tsx$/,
      use: 'awesome-typescript-loader',
    }],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};
