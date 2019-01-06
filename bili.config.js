// const vue = require("rollup-plugin-vue")

module.exports = {
  input: "src/main.js",
  banner: true,
  format: ["umd", "umd-min"],
  css: true
  // plugins: [vue({ css: true })],
  // outDir: "bili"
}
