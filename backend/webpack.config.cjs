const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

module.exports = {
  entry: "./index.ts",
  output: {
    filename: "server.js",
    path: path.join(__dirname, "dist"),
  },
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  mode: "production",
};
