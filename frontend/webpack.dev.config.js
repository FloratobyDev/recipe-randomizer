const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    historyApiFallback: true,
    port: 9000,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:4242",
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx"],
    plugins: [new TsconfigPathsPlugin()],
  },
  devtool: "inline-source-map",
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      filename: "index.html",
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
