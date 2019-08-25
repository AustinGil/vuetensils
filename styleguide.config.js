const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
  serverPort: 8080,
  title: "Vuetensils",
  require: [path.join(__dirname, "styleguide.css")],
  sections: [
    {
      content: "README.md",
      components: "src/components/**/[A-Z]*.vue"
    }
  ],
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
    plugins: [new VueLoaderPlugin()]
  }
}
