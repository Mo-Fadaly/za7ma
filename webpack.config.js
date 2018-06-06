const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const webpack = require("webpack");

const env = process.env.NODE_ENV;
const extractCss = new ExtractTextPlugin({
  filename: "cc-ss.min.css"
});

module.exports = {
  entry: ["./src/js/main.js", "./src/css/cc-ss.css"],
  devtool: "source-map",
  devServer: {
    open: true,
    hot: true,
    contentBase: "./src",
    watchContentBase: true,
    stats: "errors-only"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          env === "production" ? ExtractTextPlugin.loader : "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              plugins: [autoprefixer("last 2 versions"), cssnano()]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    extractCss,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
