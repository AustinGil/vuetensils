// rollup.config.js
import vue from "rollup-plugin-vue"
import buble from "rollup-plugin-buble"
import commonjs from "rollup-plugin-commonjs"
import replace from "rollup-plugin-replace"
// import uglify from "rollup-plugin-uglify-es"
import minimist from "minimist"
import filesize from "rollup-plugin-filesize"

const argv = minimist(process.argv.slice(2))

const config = {
  input: "src/entry.js",
  output: {
    name: "Vuetensils",
    exports: "named",
    // format: 'esm', // This is what tells rollup to use ES6 modules
    // dir: 'dist'
  },
  external: ["vue"],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true,
      },
    }),
    commonjs(),
    buble({
      objectAssign: "Object.assign",
    }),
    filesize(),
  ],
  // Prevents bundling, but doesn't rename files
  // preserveModules: true
}

// Only minify browser (iife) version
// if (argv.format === "iife") {
//   config.plugins.push(uglify())
// }

export default config
