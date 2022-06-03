// https://github.com/vue-styleguidist/vuepress-plugin-live/blob/master/markDownPlugin.js
const { path } = require('@vuepress/utils')
// const { parseComponent } = require("vue-template-compiler");
// const { isCodeVueSfc, compile } = require("vue-inbrowser-compiler");
// const getImports = require("./getImports");


const LivePlugin = (app) => {
  return {
    name: 'vuepress-plugin-live',
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
    clientConfigFile: path.resolve(
      __dirname,
      './clientAppEnhance.js'
    ),
    extendsMarkdown: (md) => {
      const originalFence = md.renderer.rules.fence;
      md.renderer.rules.fence = (...args) => {
        const [tokens, idx] = args;
        const token = tokens[idx];
        const lang = token.info.trim();

        // if it does not ends with live just use default fence
        if (
          // liveFilter
          //   ? !liveFilter(lang)
          // : 
          !/ live$/.test(lang) && !/ live /.test(lang)
        ) {
          return originalFence(...args);
        }

        const getScript = (code) => {
          // script is at the beginning of a line after a return
          // In case we are loading a vue component as an example, extract script tag
          // if (isCodeVueSfc(code)) {
          //   const parts = parseComponent(code);
          //   return parts && parts.script ? parts.script.content : "";
          // }

          //else it could be the weird almost jsx of vue-styleguidist
          return code.split(/\n[\t ]*</)[0];
        };

        const code = token.content;

        // analyze code to find requires
        // put all requires into a "requires" object
        // add this as a prop
        // const scr = getScript(code);
        // const requires = getImports(scr).map(
        //   (mod) => `'${mod}': require('${mod}')`
        // );
        const langArray = lang.split(" ");
        const langClean = langArray[0];
        const codeClean = md.utils
          .escapeHtml(code)
          .replace(/\`/g, "\\`")
          .replace(/\$/g, "\\$");
        const editorProps = langArray.find((l) => /^\{.+\}$/.test(l));
        const jsx = langArray.length > 2 && langArray[1] === "jsx" ? "jsx " : ""; // to enable jsx, we want ```vue jsx live or ```jsx jsx live
        // const markdownGenerated = `<vue-live ${jsx}
        //   :layoutProps="{lang:'${langClean}'}" 
        //   :code="\`${codeClean}\`" 
        //   :requires="{${requires.join(",")}}"
        //   ${editorProps ? ` :editorProps="${editorProps}"` : ""}
        //    />`;
        const markdownGenerated = `<vue-live ${jsx}
          :layoutProps="{lang:'${langClean}'}" 
          :code="\`${codeClean}\`" 
          ${editorProps ? ` :editorProps="${editorProps}"` : ""}
           />
           ${originalFence(...args)}`;
        // return noSsr ? `<no-ssr>${markdownGenerated}</no-ssr>` : markdownGenerated;
        return `<ClientOnly>${markdownGenerated}</ClientOnly>`;
      }
      // md.use(plugin1)
      // md.linkify.set({ fuzzyEmail: false })
    },
  }
}

module.exports = LivePlugin