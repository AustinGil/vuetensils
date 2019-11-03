// rollup.config.js
// import uglify from "rollup-plugin-uglify-es"

const argv = require("minimist")(process.argv.slice(2))

const config = {
  input: "src/entry.js",
  output: {
    name: "Vuetensils",
    exports: "named",
  },
  plugins: [
    require("rollup-plugin-replace")({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    require("rollup-plugin-vue")({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true,
      },
    }),
    require("rollup-plugin-babel")({
      exclude: "node_modules/**",
    }),
    require("rollup-plugin-commonjs")(),
    // require("rollup-plugin-buble")({
    //   objectAssign: "Object.assign",
    // }),
    require("rollup-plugin-filesize")(),
  ],
}

// Only minify browser (iife) version
// if (argv.format === "iife") {
//   config.plugins.push(uglify())
// }

export default config
