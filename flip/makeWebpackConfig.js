var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const makeConfig = dir => ({
  entry: {
    app: path.join(__dirname, `src/${dir}/index.js`)
  },
  output: {
    path: path.join(__dirname, `build/${dir}`),
    filename: "[name].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/${dir}/index.html`)
    })
  ]
});

module.exports = makeConfig;
