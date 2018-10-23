<h2 align="center">commercetools UI Kit 💅</h2>
<p align="center">
<a href="https://www.npmjs.com/package/@commercetools-frontend/ui-kit"><img src="https://img.shields.io/npm/v/@commercetools-frontend/ui-kit.svg" alt="" /></a> <a href="https://github.com/commercetools/ui-kit/issues"><img src="https://img.shields.io/github/issues/commercetools/ui-kit.svg" alt="GitHub issues" /></a> <a href="https://github.com/commercetools/ui-kit/network"><img src="https://img.shields.io/github/forks/commercetools/ui-kit.svg" alt="GitHub forks" /></a> <a href="https://github.com/commercetools/ui-kit/stargazers"><img src="https://img.shields.io/github/stars/commercetools/ui-kit.svg" alt="GitHub stars" /></a> <a href="https://github.com/commercetools/ui-kit/blob/master/LICENSE"><img src="https://img.shields.io/github/license/commercetools/ui-kit.svg" alt="GitHub license" /></a>
</p>
<p align="center">
  <i>✨ Component library based on our design system 🛠</i>
</p>

## Install

```bash
$ yarn add @commercetools-frontend/ui-kit
```

The package's main export contains all UI components.

```js
import {
  Text,
  TextInput,
  PrimaryButton,
  // etc.
} from '@commercetools-frontend/ui-kit';
```

#### Importing CSS modules

When you are developing your application using the UI Kit components, chances you want to use the same design tokens as our design system. We provide them through both **CSS variables** and **JavaScript variables**.

We expose the **CSS variables** from the `@commercetools-frontend/ui-kit/materials/custom-properties.css` file. This file can be used either like

```css
@import '@commercetools-frontend/ui-kit/materials/custom-properties.css';

.container {
  padding: var(--spacing-8);
}
```

or can be used in along with [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) like

```js
  postcssCustomProperties({
    preserve: false,
    importFrom: '@commercetools-frontend/ui-kit/materials/custom-properties.css',
  }),
```

You can also access the JavaScript variables like this

```js
import { customProperties } from '@commercetools-frontend/ui-kit';

const green = customProperties['--color-green'];
```

> Please look at the file itself to inspect which variables are available (_documentation will be provided in the future_).

#### Importing SVG images

Similar to CSS modules, if you need to use one of our available SVG images, you can require them from `/images`.

```js
import UnexpectedErrorSVG from '@commercetools-frontend/ui-kit/images/maintenance/unexpected-error.svg';

<img src={UnexpectedErrorSVG} />;
```

> Please look into the package itself to inspect what images are available

## Motivation

- Declarative components serving as a design guide
- Shared independently from the application's code base
- Used across different apps consumed by different teams
- Shared language between developers and designers

## Documentation and Storybook

Available at https://uikit.commercetools.com.

## Release

The release process is _semi-automated_: you only need to **manually** trigger it and [Travis][travis] will take care of the rest.

The steps to prepare and trigger a release are as follows:

- ensure you are on the latest `master` branch
- update the `CHANGELOG.md`
  - run `yarn changelog` to get a code snippet of the important commits from the last release
  - copy that and paste it into `CHANGELOG.md` file
  - make sure that the git tag references are correctly defined and the top entry represents the _new_ tag that you are about to create
  - add or modify the generated changelog to provide more context about the new release
- bump the `version` in the `package.json`
- make a commit and push it to `master` (e.g. `git commit -am "chore: bump version to 2.0.0, update changelog"`)
  - if you can't push it directly to `master`, open a Pull Request first
- at this point you can create the `tag`: `git tag -m "Version v2.0.0" v2.0.0`
  - the tag name is the `version` string in the `package.json` plus the prefix `v`
- push the tag: `git push --tags`

From now on, [Travis][travis] will take over the release: build the bundles, publish to `npm` and update branch for the documentation website (see below).

## Publishing documentation website

The documentation is currently built with [Storybook][storybook] and is hosted on [Netlify][netlify].

By default, only _Deploy Previews_ (Pull Requests) are deployed to [Netlify][netlify]. The _Production_ website is deployed from the branch `master`.

[webpack]: https://webpack.js.org
[storybook]: https://storybook.js.org
[netlify]: https://www.netlify.com
[travis]: https://travis-ci.org/commercetools/ui-kit/

## Translations (i18n)

The UI Kit uses `react-intl`. The core messages are written down in `messages.js` files.

The translations for the supported languages exist in the `/i18n` folder. We do not use any automated translation software.

### Adding new messages

In case you are working on a component and you want to add a completely new message, you should add it to (or create a) `messages.js` file. See the other `messages.js` files as a reference.

After adding the message(s), you need to run `yarn i18n:build`. This will modify the language files in `/i18n` by adding empty translations for the message keys.

### Editing translations

If you want to modify an existing translation, you will need to manually edit the related files in `/i18n`.
