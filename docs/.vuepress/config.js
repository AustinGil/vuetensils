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
  description:
    'A "naked" component library for building accessible, lightweight, on-brand applications.',
  themeConfig: {
    home: true,
    logo: "/static/logo.png",
    repo: "stegosource/vuetensils",
    lastUpdated: "Last Updated",
    nav: [{ text: "Home", link: "/" }, { text: "Docs", link: "/introduction" }],
    sidebar: [
      "/Introduction",
      {
        title: "Components",
        collapsable: false,
        children: [
          "/components/VAlert",
          "/components/VAsync",
          "/components/VDrawer",
          "/components/VDropdown",
          "/components/VFile",
          "/components/VImg",
          "/components/VInput",
          "/components/VIntersect",
          "/components/VModal",
          "/components/VResize",
          "/components/VTabs",
          "/components/VToggle",
        ],
      },
      {
        title: "Directives",
        collapsable: false,
        children: [
          "/directives/autofocus",
          "/directives/clickout",
          "/directives/copy",
        ],
      },
    ],
  },
  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-32074770-16",
      },
    ],
    [
      "live",
      {
        layout: path.resolve(__dirname, "./LivePreview"),
      },
    ],
    [
      "docgen",
      {
        componentsDir: path.join(__dirname, "../../src/components"),
      },
    ],
  ],
}
