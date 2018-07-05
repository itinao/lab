// @ts-check
const path = require("path");

const project = {
  base(...args) {
    return path.join(__dirname, ...args);
  },
  src(...args) {
    return this.base("src/", ...args);
  },
  dist(...args) {
    return this.base("public/assets/", ...args);
  }
};

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: project.src("bundle.ts"),
  output: {
    path: project.dist("js"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: "ts-loader"
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        },
        {
          loader: "css-loader" // translates CSS into CommonJS
        },
        {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
  resolve: {
    modules: [project.base("node_modules"), project.src()],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"]
  }
};
