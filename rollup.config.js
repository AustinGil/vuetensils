// // https://code.lengstorf.com/learn-rollup-js/
// import { name, dependencies } from "./package.json"

// import babel from "rollup-plugin-babel"
// // import eslint from "rollup-plugin-eslint"
// // import resolve from "rollup-plugin-node-resolve"
// // import commonjs from "rollup-plugin-commonjs"
import { uglify } from "rollup-plugin-uglify"

// PostCSS
import postcss from "rollup-plugin-postcss"
import simplevars from "postcss-simple-vars"
import nested from "postcss-nested"
import cssnext from "postcss-cssnext"
import cssnano from "cssnano"

// export default {
//   input: "src/main.js",
//   output: {
//     file: "bundle.js",
//     // format: 'cjs'
//     format: "esm"
//   },
//   // sourceMap: "inline",
//   plugins: [
//     postcss({
//       plugins: [simplevars(), nested(), cssnext({ warnForDuplicates: false }), cssnano()],
//       extensions: [".css"]
//     }),
//     // resolve({
//     //   jsnext: true,
//     //   main: true,
//     //   browser: true
//     // }),
//     // commonjs(),
//     // eslint({
//     //   exclude: ["src/styles/**"]
//     // }),
//     babel({
//       exclude: "node_modules/**"
//     }),
//     uglify()
//   ]
// }

const fs = require("fs")
const path = require("path")
const babel = require("rollup-plugin-babel")
const resolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const { camelCase } = require("lodash")
const { name, dependencies } = require("./package.json")

const base = path.resolve(__dirname, ".")
const src = path.resolve(base, "src")
const dist = path.resolve(base, "dist")

// Libs in `external` will not be bundled to dist,
// since they are expected to be provided later.
// We want to include some of them in the build, so we exclude it here.
const externalExcludes = []

// The base rollup configuration
const baseConfig = {
  input: path.resolve(src, "main.js"),
  external: Object.keys(dependencies),
  plugins: [
    postcss({
      plugins: [simplevars(), nested(), cssnext({ warnForDuplicates: false }), cssnano()],
      extensions: [".css"]
    }),
    resolve({ external: ["vue"] }),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true
    }),
    uglify()
  ]
}

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

module.exports = [
  // UMD
  {
    ...baseConfig,
    external: Object.keys(dependencies).filter(dep => externalExcludes.indexOf(dep) === -1),
    output: {
      format: "umd",
      name: camelCase(name),
      file: path.resolve(dist, name + ".js"),
      sourcemap: true
    }
  },

  // COMMON
  {
    ...baseConfig,
    external: Object.keys(dependencies).filter(dep => externalExcludes.indexOf(dep) === -1),
    output: {
      format: "cjs",
      name: camelCase(name),
      file: path.resolve(dist, name + ".common.js"),
      sourcemap: true
    }
  },

  // ES
  {
    ...baseConfig,
    output: {
      format: "es",
      file: path.resolve(dist, name + ".esm.js"),
      sourcemap: true
    }
  }
]
