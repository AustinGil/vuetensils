const fs = require("fs")

var dirpath = "./docs"

// generate sidenav order by update time
var sb = fs
  .readdirSync(dirpath)
  .filter(f => {
    return f.match(/\.(md)$/i) && f !== "README.md"
  })
  .map(f => {
    return {
      path: "/" + f,
      mtime: fs.statSync(dirpath + "/" + f).mtime,
    }
  })
  .sort((a, b) => a.mtime - b.mtime)
  .map(f => f.path)

module.exports = {
  title: "Vuetensils",
  description: "A tasty toolset for Vue.js",
  themeConfig: {
    home: true,
    title: "Documentation!!!",
    // logo: "/static/logo.png",
    repo: "stegosource/vuetensils",
    sidebar: sb,
    // lastUpdated: "Last Updated",
    nav: [{ text: "Home", link: "/" }],
    ga: "UA-32074770-16",
  },
}
