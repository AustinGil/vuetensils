// const fs = require('fs');
const path = require('path');
const pkg = require('../../package.json')
// const vueDocs = require("vue-docgen-api")

const title = 'Vuetensils'

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
  title: title,
  description: pkg.description,
  head: [
    ['meta', { name: 'description', content: pkg.description }],
    ['meta', { name: 'author', content: pkg.author.name }],
    ['title', { rel: 'icon', href: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'><style>.bg{fill:white;}.fg{fill:black;}@media(prefers-color-scheme:dark){.bg{fill:black;}.fg{fill:white;}}</style><path class='bg' d='M0 0h500v500H0z'/><path class='fg' d='M246 411l5 32c2 9-1 16-8 20l-14 8-14 8c-8 3-16 4-23 0-8-3-13-9-16-19l-10-38a880 880 0 01-11-65l-3-25c0-5-2-8-3-10-2-2-6-3-10-3l-55-2c-6-1-10 0-13 2s-7 6-8 12l-15 46-16 47-3 9-3 10-1 4-3 5c-2 4-6 7-11 9s-10 2-15 0c-3-1-5-3-5-4l-1-5 1-5 1-5 19-55 19-55 1-3 1-4c3-6 0-9-7-8h-61l-5-1c-2 0-2-2-3-4l-4-14-1-5c-1-13 5-20 17-20l36-1 35 1c6 0 10-1 13-3s5-5 7-10l19-43 20-41a1373 1373 0 0145-87c2-7 2-14 2-20l2-19 2-18c0-10 6-15 15-15h16l14-1h-1 1v1l-1-1 1 7-1 6c-4 10-5 20-5 30a516 516 0 001 32v3l1-3 1-1c5-6 8-12 8-20 0-6 1-13 3-19l1-7 1-5c2-4 5-6 9-6 3 0 5 2 7 6l4 11 2 12 1 54v55l2 52 2 52 3 9c1 2 3 5 7 7 3 2 5 5 7 9l3 12 2 11c0 4-4 7-10 8-2 1-3 2-3 5l-2 7 4 34 4 34zM139 281c7 1 10-2 10-9V144l-1-4-2-2-3 2-4 2v3l-2 2-24 58-24 58c-2 4-2 7 0 9 1 2 4 3 8 3l21 3 21 3zm60-183l-1 1h1v-1zM-15 434c0 6 1 9 7 8l-7 2c-3 1-3 4-1 8 1 1 0 2-2 3l-3 2a7231 7231 0 01-6-5l9-29 9-29 2-2 1-1v6l-4 18-5 19z'/><path class='fg' d='M516 209a1308 1308 0 00-33 253c0 7 3 13 7 19-4 0-7-2-7-4l-3-8c-3-14-5-29-6-44l-1-43 4-44-4 1-2 3-4 54c-2 18-1 36 2 54 2 13 6 24 11 34 4 8 2 13-5 15-7 3-15 3-23 1-9-3-16-7-20-13-6-8-10-16-12-25l-6-27-1-9-1-9-3-1h-4l-6 9-6 8-16 19-17 18c-5 5-10 9-16 11-6 3-13 3-20 1l-17-1-17 1c-26 5-47-4-63-27-10-14-17-30-22-45-4-15-6-32-6-50 2-100 32-190 91-269 12-16 26-30 40-42 15-13 31-22 51-28l18-5 18 1 32 8 31 11 8 6 6 9c2 1 2 3 2 6v6l-6-1h-10c-3 4-7 6-11 5l-10-5-8-6-10-5-11-2-7 1c-18 12-34 27-49 45a462 462 0 00-84 348c17-10 32-24 48-41a547 547 0 0077-115l29-50c1-2 1-2-1-1l-7 3-7 3c-1 1-2 1-1-1l-1-1 1 2-5-2-6-1 23-24c-9-1-17 3-22 8l-17 19c-3 3-6 5-10 6a26 26 0 01-23-4c-4-3-7-6-8-10-4-8-3-15 3-20l6-5 5-4 44-23 46-22c10-4 19-4 27 1s15 13 19 24l1 5 6 10-1 9zm-8-6l-1 2h-1l1 1v-1l1-2zM271 329l-3 4c-1 3-1 5-3 7l3-2 2-4 1-2v-3zm-6 11l1 2v2l1 6 2-1h1l-1-3-2-3-1-2-1-1zm6 50v-4l-1-4 2-1-3-8-3-6v15l2 8 2 4 1-4zm2 24l2 3-1-7-1-1h-1v2l1 3zm0-106l2-8v-1l-3-3v10l1 1v1zm6-33v1-1zm82 151l1 1-1-1zm79-212h-1 1zm56 30l-3-2v5c0-2 1-3 3-3zm-17 66l-2 1-2 10v10l2 5 1-3 1-3v-20zm1-10l3-5 4-21 3-20-5 20-5 21v5zm-68-55l-2-1 5-4-2 2-1 3zm3-5l1-1h1l-2 1zm85 236h1l-1 1v-1z'/></svg>` }],
    ['link', { rel: 'canonical', content: pkg.homepage }],
    ['meta', { property: 'og:title', content: `${title} - by ${pkg.author.name}` }],
    ['meta', { property: 'og:description', content: pkg.description }],
    //   <!-- https://cards.microlink.io/editor?preset=tinybird&p=2gUwPD4KICA8TGluawogICAgaHJlZj0naHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1IaW5kOml0YWwsd2dodEAmZmFtaWx5PVJvYm90bzppdGFsLHdnaHRAMCwxMDA7MCwyMDA7MCwzMDA7MCw0MDA7MCw1MDA7MCw2MDA7MCw3MDA7MCw4MDA7MCw5MDA7MSwxMDA7MSwyMDA7MSwzMDA7MSw0MDA7MSw1MDA7MSw2MDA7MSw3MDA7MSw4MDA7MSw5MDAmZmFtaWx5PVJvYm90bytTbGFiOml0YWwsd2dodEAwLDEwMDswLDIwMDswLDMwMDswLDQwMDswLDUwMDswLDYwMDswLDcwMDswLDgwMDswLDkwMDsxLDEwMDsxLDIwMDsxLDMwMDsxLDQwMDsxLDUwMDsxLDYwMDsxLDcwMDsxLDgwMDsxLDkwMCZkaXNwbGF5PXN3YXAnCiAgICByZWw9J3N0eWxlc2hlZXQnCiAgLz4KICA8RmxleAogICAgc3g9e3sKICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsCiAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywKICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsCiAgICAgIGZvbnRGYW1pbHk6ICdIaW5kJywKICAgICAgYmc6ICdibGFjaycsCiAgICAgIGNvbG9yOiAnd2hpdGUnLAogICAgICBwbDogNSwKICAgICAgcHI6IDUsCiAgICB9fQogID4KICAgIDxGbGV4CiAgICAgIHN4PXt7CiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsCiAgICAgICAgYm90dG9tOiA0LAogICAgICAgIHJpZ2h0OiA1LAogICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLAogICAgICB9fQogICAgPgogICAgICA8RmxleAogICAgICAgIHN4PXt7CiAgICAgICAgICBmb250U2l6ZTogJzI0cHgnLAogICAgICAgIH19CiAgICAgID4KICAgICAgICBieQogICAgICAgIDxJbWFnZQogICAgICAgICAgc3g9e3sKICAgICAgICAgICAgbWFyZ2luTGVmdDogJzEwcHgnLAogICAgICAgICAgICB3aWR0aDogJzEwMHB4JywKICAgICAgICAgIH19CiAgICAgICAgICBzcmM9J2h0dHBzOi8vYXVzdGluZ2lsLmNvbS93cC1jb250ZW50L3VwbG9hZHMvbG9nby1hdXN0aW4tZ2lsLXdoaXRlLnN2ZycKICAgICAgICAvPgogICAgICA8L0ZsZXg-CiAgICAgIGF1c3RpbmdpbC5jb20KICAgIDwvRmxleD4KCiAgICA8VGV4dAogICAgICBzeD17ewogICAgICAgIGZvbnRTaXplOiAnNDJweCcsCiAgICAgIH19CiAgICA-CiAgICAgIHtxdWVyeS50aXRsZX0KICAgIDwvVGV4dD4KICAgIDxUZXh0CiAgICAgIHN4PXt7CiAgICAgICAgZm9udFNpemU6ICcyMHB4JywKICAgICAgICBtYXhXaWR0aDogJzUwJScsCiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJwogICAgICB9fQogICAgPgogICAgICB7cXVlcnkuZGVzY3JpcHRpb259CiAgICA8L1RleHQ-CiAgPC9GbGV4Pgo8Lz4&description=Style+check+helps+developers+audit+the+effect+of+different+CSS+sources+on+plain+HTML+elements.&title=Style+Check -->
    ['meta', { property: 'og:image', content: `https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dtinybird%26p%3D2gUwPD4KICA8TGluawogICAgaHJlZj0naHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1IaW5kOml0YWwsd2dodEAmZmFtaWx5PVJvYm90bzppdGFsLHdnaHRAMCwxMDA7MCwyMDA7MCwzMDA7MCw0MDA7MCw1MDA7MCw2MDA7MCw3MDA7MCw4MDA7MCw5MDA7MSwxMDA7MSwyMDA7MSwzMDA7MSw0MDA7MSw1MDA7MSw2MDA7MSw3MDA7MSw4MDA7MSw5MDAmZmFtaWx5PVJvYm90bytTbGFiOml0YWwsd2dodEAwLDEwMDswLDIwMDswLDMwMDswLDQwMDswLDUwMDswLDYwMDswLDcwMDswLDgwMDswLDkwMDsxLDEwMDsxLDIwMDsxLDMwMDsxLDQwMDsxLDUwMDsxLDYwMDsxLDcwMDsxLDgwMDsxLDkwMCZkaXNwbGF5PXN3YXAnCiAgICByZWw9J3N0eWxlc2hlZXQnCiAgLz4KICA8RmxleAogICAgc3g9e3sKICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsCiAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywKICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsCiAgICAgIGZvbnRGYW1pbHk6ICdIaW5kJywKICAgICAgYmc6ICdibGFjaycsCiAgICAgIGNvbG9yOiAnd2hpdGUnLAogICAgICBwbDogNSwKICAgICAgcHI6IDUsCiAgICB9fQogID4KICAgIDxGbGV4CiAgICAgIHN4PXt7CiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsCiAgICAgICAgYm90dG9tOiA0LAogICAgICAgIHJpZ2h0OiA1LAogICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLAogICAgICB9fQogICAgPgogICAgICA8RmxleAogICAgICAgIHN4PXt7CiAgICAgICAgICBmb250U2l6ZTogJzI0cHgnLAogICAgICAgIH19CiAgICAgID4KICAgICAgICBieQogICAgICAgIDxJbWFnZQogICAgICAgICAgc3g9e3sKICAgICAgICAgICAgbWFyZ2luTGVmdDogJzEwcHgnLAogICAgICAgICAgICB3aWR0aDogJzEwMHB4JywKICAgICAgICAgIH19CiAgICAgICAgICBzcmM9J2h0dHBzOi8vYXVzdGluZ2lsLmNvbS93cC1jb250ZW50L3VwbG9hZHMvbG9nby1hdXN0aW4tZ2lsLXdoaXRlLnN2ZycKICAgICAgICAvPgogICAgICA8L0ZsZXg-CiAgICAgIGF1c3RpbmdpbC5jb20KICAgIDwvRmxleD4KCiAgICA8VGV4dAogICAgICBzeD17ewogICAgICAgIGZvbnRTaXplOiAnNDJweCcsCiAgICAgIH19CiAgICA-CiAgICAgIHtxdWVyeS50aXRsZX0KICAgIDwvVGV4dD4KICAgIDxUZXh0CiAgICAgIHN4PXt7CiAgICAgICAgZm9udFNpemU6ICcyMHB4JywKICAgICAgICBtYXhXaWR0aDogJzUwJScsCiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJwogICAgICB9fQogICAgPgogICAgICB7cXVlcnkuZGVzY3JpcHRpb259CiAgICA8L1RleHQ-CiAgPC9GbGV4Pgo8Lz4%26description%3D${encodeURI(pkg.description)}%26title%3D${encodeURI(title)}` }],
    ['meta', { property: 'og:url', content: pkg.homepage }],
    ['meta', { property: 'og:site_name', content: `${title} - by ${pkg.author.name}` }],
    ['meta', { property: 'og:card', content: 'summary_large_image' }],
    ['meta', { property: 'og:image:alt', content: `${title} - by ${pkg.author.name}` }],
    ['meta', { itemprop: 'name', content: `${title} - by ${pkg.author.name}` }],
    ['meta', { itemprop: 'description', content: pkg.description }],
    ['meta', { itemprop: 'image', content: `https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dtinybird%26p%3D2gUwPD4KICA8TGluawogICAgaHJlZj0naHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1IaW5kOml0YWwsd2dodEAmZmFtaWx5PVJvYm90bzppdGFsLHdnaHRAMCwxMDA7MCwyMDA7MCwzMDA7MCw0MDA7MCw1MDA7MCw2MDA7MCw3MDA7MCw4MDA7MCw5MDA7MSwxMDA7MSwyMDA7MSwzMDA7MSw0MDA7MSw1MDA7MSw2MDA7MSw3MDA7MSw4MDA7MSw5MDAmZmFtaWx5PVJvYm90bytTbGFiOml0YWwsd2dodEAwLDEwMDswLDIwMDswLDMwMDswLDQwMDswLDUwMDswLDYwMDswLDcwMDswLDgwMDswLDkwMDsxLDEwMDsxLDIwMDsxLDMwMDsxLDQwMDsxLDUwMDsxLDYwMDsxLDcwMDsxLDgwMDsxLDkwMCZkaXNwbGF5PXN3YXAnCiAgICByZWw9J3N0eWxlc2hlZXQnCiAgLz4KICA8RmxleAogICAgc3g9e3sKICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsCiAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywKICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsCiAgICAgIGZvbnRGYW1pbHk6ICdIaW5kJywKICAgICAgYmc6ICdibGFjaycsCiAgICAgIGNvbG9yOiAnd2hpdGUnLAogICAgICBwbDogNSwKICAgICAgcHI6IDUsCiAgICB9fQogID4KICAgIDxGbGV4CiAgICAgIHN4PXt7CiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsCiAgICAgICAgYm90dG9tOiA0LAogICAgICAgIHJpZ2h0OiA1LAogICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLAogICAgICB9fQogICAgPgogICAgICA8RmxleAogICAgICAgIHN4PXt7CiAgICAgICAgICBmb250U2l6ZTogJzI0cHgnLAogICAgICAgIH19CiAgICAgID4KICAgICAgICBieQogICAgICAgIDxJbWFnZQogICAgICAgICAgc3g9e3sKICAgICAgICAgICAgbWFyZ2luTGVmdDogJzEwcHgnLAogICAgICAgICAgICB3aWR0aDogJzEwMHB4JywKICAgICAgICAgIH19CiAgICAgICAgICBzcmM9J2h0dHBzOi8vYXVzdGluZ2lsLmNvbS93cC1jb250ZW50L3VwbG9hZHMvbG9nby1hdXN0aW4tZ2lsLXdoaXRlLnN2ZycKICAgICAgICAvPgogICAgICA8L0ZsZXg-CiAgICAgIGF1c3RpbmdpbC5jb20KICAgIDwvRmxleD4KCiAgICA8VGV4dAogICAgICBzeD17ewogICAgICAgIGZvbnRTaXplOiAnNDJweCcsCiAgICAgIH19CiAgICA-CiAgICAgIHtxdWVyeS50aXRsZX0KICAgIDwvVGV4dD4KICAgIDxUZXh0CiAgICAgIHN4PXt7CiAgICAgICAgZm9udFNpemU6ICcyMHB4JywKICAgICAgICBtYXhXaWR0aDogJzUwJScsCiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJwogICAgICB9fQogICAgPgogICAgICB7cXVlcnkuZGVzY3JpcHRpb259CiAgICA8L1RleHQ-CiAgPC9GbGV4Pgo8Lz4%26description%3D${encodeURI(pkg.description)}%26title%3D${encodeURI(title)}` }],
  ],
  themeConfig: {
    home: true,
    logo: '/static/logo.png',
    repo: 'austingil/vuetensils',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/introduction' },
    ],
    sidebar: [
      '/Introduction',
      {
        title: 'Components',
        collapsable: false,
        children: [
          '/components/Alert',
          '/components/Async',
          '/components/Btn',
          '/components/Date',
          '/components/Dialog',
          '/components/Drawer',
          '/components/Dropdown',
          '/components/File',
          '/components/Form',
          '/components/Img',
          '/components/Input',
          '/components/Intersect',
          '/components/Resize',
          '/components/Skip',
          '/components/Tabs',
          '/components/Table',
          '/components/Toggle',
          '/components/Tooltip',
          '/components/Try',
        ],
      },
      {
        title: 'Directives',
        collapsable: false,
        children: [
          '/directives/autofocus',
          '/directives/clickout',
          '/directives/copy',
          '/directives/intersect',
        ],
      },
      {
        title: 'Filters',
        collapsable: false,
        children: [
          '/filters/capitalize',
          '/filters/currency',
          '/filters/number',
          // "/filters/placeholder",
          '/filters/plural',
          '/filters/truncate',
        ],
      },
      {
        title: 'Composables',
        collapsable: false,
        children: [
          '/composables/useAsync',
          '/composables/useForm',
        ],
      },
      '/Cookbook',
    ],
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-32074770-16',
      },
    ],
    [
      'live',
      {
        layout: path.resolve(__dirname, './LivePreview'),
      },
    ],
    // [
    //   'docgen',
    //   {
    //     componentsDir: path.join(__dirname, '../../src/components'),
    //   },
    // ],
  ],
};
