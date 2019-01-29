# Documentation website

This folder contains the Gatsby setup to run and build the documentation website for the ui-kit.

## Usage

To run the development server, execute `yarn start` (_or `yarn website:start` from the project root folder_).

> The website consumes the bundled ui-kit from `dist`. Therefore, it requires the bundles to be built before starting (`yarn build` from the project root folder).

To build the website, execute `yarn build`.

## Project structure

```
├── README.md
├── content
│   └── getting-started.mdx
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── gatsby-ssr.js
├── package.json
└── src
    ├── components
    │   ├── header.js
    │   ├── image.js
    │   ├── layout.js
    │   ├── markdown-layout.js
    │   └── seo.js
    ├── images
    ├── pages
    │   ├── 404.js
    │   └── index.js
    └── templates
        └── markdown.js
```

- The `gatsby-*` files are used by Gatsby for processing different things. Please refer to the [Gatsby documentation](https://www.gatsbyjs.org) for more information.
- The `content` folder is supposed to contain the actual content pages in form of `mdx` files. Each file should contain a `frontmatter` section at the top with information about the page

```md
---
id: getting-started
title: Getting started
permalink: /getting-started
---

This is the page content
```

- the `src` folder contains React components used to build the website pages
  - the `src/templates` folder contains components that will serve as templates. For example, the markdown template will be used to render the content of the `mdx` files
  - the `src/pages` folder contains pre-defined pages such as the landing page, the page not found, etc.
  - the `src/components` folder contains helper components used to build the pages

### Components documentation

Each ui-kit component should have a `{name}.mdx` file located in the component folder. Gatsby will then scan all folders to check for `mdx` files to be transformed into pages.
