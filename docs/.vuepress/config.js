// const fs = require("fs")
const path = require("path")
// const vueDocs = require("vue-docgen-api")

// var dirpath = "./docs"

// generate sidenav order by update time
// var sb = fs
//   .readdirSync(dirpath)
//   .filter(f => {
//     return f.match(/\.(md)$/i) && f !== "README.md"
//   })
//   .map(f => {
//     return {
//       path: "/" + f,
//       mtime: fs.statSync(dirpath + "/" + f).mtime,
//     }
//   })
//   .sort((a, b) => a.mtime - b.mtime)
//   .map(f => f.path)

// var componentInfo = vueDocs.parse(
//   path.join(__dirname, "../../src/components/VAlert/VAlert.vue")
// )

module.exports = {
  title: "Vuetensils",
  description: "A tasty toolset for Vue.js",
  themeConfig: {
    home: true,
    title: "Documentation!!!",
    logo: "/static/logo.png",
    repo: "stegosource/vuetensils",
    // // lastUpdated: "Last Updated",
    nav: [{ text: "Home", link: "/" }, { text: "Docs", link: "/introduction" }],
    // // sidebar: sb
    sidebar: {
      // "/Introduction": ["Guide"],
      "/components/": ["VAlert"],
      "/": ["Introduction"],
    },
    ga: "UA-32074770-16",
  },
  // plugins: [
  //   [
  //     "live",
  //     {
  //       layout: path.resolve(__dirname, "./custom-layout"),
  //     },
  //   ],
  // ],
}
