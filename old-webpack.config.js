const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const NAME = "vuetensils";

const config = {
  mode: "production",
  entry: path.resolve(__dirname + "/src/main.js"),
  output: {
    path: path.resolve(__dirname + "/dist/")
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${NAME}.min.css`,
      chunkFilename: "[id].css"
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        include: [path.join(__dirname, "src")]
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  }
  // externals: {
  //   moment: "moment"
  // },
};

module.exports = [
  // Config 1: For browser environment
  merge(config, {
    output: {
      filename: `${NAME}.min.js`,
      libraryTarget: "window",
      library: "vuetensils"
    }
  }),
  // Config 2: For Node-based development environments
  merge(config, {
    output: {
      filename: `${NAME}.js`,
      libraryTarget: "umd",
      library: NAME,
      umdNamedDefine: true,
      globalObject: "this" // Required for "window is not defined" error in SSR
    }
  })
];
