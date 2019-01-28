const path = require("path")
const vueLoader = require("vue-loader")

module.exports = {
  require: [path.join(__dirname, "styleguide.css")],
  components: "src/components/**/[A-Z]*.vue",
  pagePerSection: true,
  skipComponentsWithoutExample: true,
  usageMode: "expand",
  exampleMode: "expand",
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader"
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [new vueLoader.VueLoaderPlugin()]
  }
}
