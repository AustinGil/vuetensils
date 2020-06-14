const fs = require("fs")
const path = require("path")
// const vueDocs = require("vue-docgen-api")

// const components = fs
//   .readdirSync("./docs/components")
//   .filter(f => {
//     return f.match(/\.(md)$/i) && f !== "README.md"
//   })
//   .map(f => {
//     return `/components/${f.slice(0, -3)}`
//   })

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
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/introduction" },
    ],
    sidebar: [
      "/Introduction",
      {
        title: "Components",
        collapsable: false,
        children: [
          "/components/Action",
          "/components/Alert",
          "/components/Async",
          "/components/Date",
          "/components/Dialog",
          "/components/Drawer",
          "/components/Dropdown",
          "/components/File",
          "/components/Form",
          "/components/Img",
          "/components/Input",
          "/components/Intersect",
          "/components/Resize",
          "/components/Skip",
          "/components/Tabs",
          "/components/Table",
          "/components/Toggle",
          "/components/Tooltip",
          "/components/Try",
        ],
      },
      {
        title: "Directives",
        collapsable: false,
        children: [
          "/directives/autofocus",
          "/directives/clickout",
          "/directives/copy",
          "/directives/intersect",
        ],
      },
      {
        title: "Filters",
        collapsable: false,
        children: [
          "/filters/capitalize",
          "/filters/currency",
          "/filters/number",
          // "/filters/placeholder",
          "/filters/plural",
          "/filters/truncate",
        ],
      },
      "/Cookbook",
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
