# Hey! Thanks for your interest in contributing.

This is my first time doing one of these, so here's the deal:

- First and foremost, be kind and practice empathy.
- You may be asked to make some changes, or your ideas may not be accepted. This does not mean they were bad ideas, and does not reflect on you as a developer. Please do not take it personally. I'm very open to changes, and welcome any sort of contribution.
- You may see other folks' ideas you don't agree with. Please take a moment to truly consider their thoughts before dismissing them. Ask questions if you need clarification, or provide details on how it can be improved. Help people feel welcome.
- I work on this in my free time, so please give me a week to review something before getting back to you (although it's usually a day or two).

## Issue tracker

The [issue tracker](https://github.com/austingil/vuetensils/issues) is
the preferred channel for bug reports, features requests
and submitting pull requests, but please respect the following
restrictions:

* Please **do not** use the issue tracker for personal support requests.

* Please **do not** get off track in issues. Keep the discussion on topic and
  respect the opinions of others.

* Please **do not** post comments consisting solely of "+1" or ":thumbsup:".
  Use [GitHub's "reactions" feature](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments)
  instead. We reserve the right to delete comments which violate this rule.

## Development

- All the code exists in the `/src` folder and is exported from the index file of the respective folder. For example, all components are exported from `/src/components/index.js`
- The documentation site uses [Vuepress](https://vuepress.vuejs.org/) and exists in the `/docs` folder. You can find configuration options at `/docs/.vuepress`.

I generally use the documentation site as the development environment.
- `cd docs`
- `npm run dev`
- Go to http://localhost:8080 in your browser.

Documentation is very important, so you will need to add good documentation for anything you add. Tests are encouraged, but I don't have many, so I'd be a hypocrite to force you to.

Please keep any PRs isolated to small, specific changes. It makes my life easier and will speed up my review time.

## Coding Style

I follow a few different coding standards:
- Vue: [Vue.js Style Guide](https://vuejs.org/v2/style-guide/)
- HTML & CSS: [Codeguide](https://codeguide.co/)
- JavaScript: Mostly [StandardJS](https://standardjs.com/)

I ask that you try to do so as well, but it's probably fine if you don't. The project is set up to auto-format on commit anyway :)

You may want to install these if you do not have them already. Not required, but it will help you with auto-formatting based on the style guide.:
- VS Code editor
- ESLint
- Stylelint
- Prettier


