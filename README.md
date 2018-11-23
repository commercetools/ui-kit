<h2 align="center">commercetools UI Kit 💅</h2>
<p align="center">
<a href="https://www.npmjs.com/package/@commercetools-frontend/ui-kit"><img src="https://img.shields.io/npm/v/@commercetools-frontend/ui-kit.svg" alt="" /></a> <a href="https://github.com/commercetools/ui-kit/issues"><img src="https://img.shields.io/github/issues/commercetools/ui-kit.svg" alt="GitHub issues" /></a> <a href="https://github.com/commercetools/ui-kit/network"><img src="https://img.shields.io/github/forks/commercetools/ui-kit.svg" alt="GitHub forks" /></a> <a href="https://github.com/commercetools/ui-kit/stargazers"><img src="https://img.shields.io/github/stars/commercetools/ui-kit.svg" alt="GitHub stars" /></a> <a href="https://github.com/commercetools/ui-kit/blob/master/LICENSE"><img src="https://img.shields.io/github/license/commercetools/ui-kit.svg" alt="GitHub license" /></a>
</p>
<p align="center">
  <i>✨ Component library based on our design system 🛠</i>
</p>

> If you are building **Merchant Center Applications**, be sure to check out our [application-kit](https://github.com/commercetools/merchant-center-application-kit)

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

#### Importing CSS variables

When you are developing your application using the UI Kit components, chances you want to use the same design tokens as our design system. We provide them through both **CSS variables** and **JavaScript variables**.

We expose the **CSS variables** from the `@commercetools-frontend/ui-kit/materials/custom-properties.css` file.

**Importing css variables in css files**

You will need a [postcss-import](https://github.com/postcss/postcss-import) plugin, and a postcss variable plugin: either [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) or [postcss-css-variables](https://github.com/MadLittleMods/postcss-css-variables) would work.

```css
@import '@commercetools-frontend/ui-kit/materials/custom-properties.css';

.container {
  padding: var(--spacing-8);
}
```

```js
// wherever you process your CSS
postcss([postcssImportPlugin(), postcssCustomProperties()]);
```

**Using postcss-custom-properties and importFrom**

The ui-kit css variables can also be injected using [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties), removing the need to import them directly inside your css files.

```css
/* no import required! */
.container {
  padding: var(--spacing-8);
}
```

```js
// wherever you process your CSS
postcss([
  postcssCustomProperties({
    preserve: false,
    importFrom: require.resolve(
      '@commercetools-frontend/ui-kit/materials/custom-properties.css'
    ),
  }),
]);
```

**Accessing JavaScript variables and design tokens**

You can also access the JavaScript variables like this

```js
import { customProperties } from '@commercetools-frontend/ui-kit';

const green = customProperties['--color-green'];
```

> Please look at the [file](materials/custom-properties.json) itself to inspect which variables are available (_documentation will be provided in the future_).

## Motivation

- Declarative components serving as a design guide
- Shared independently from the application's code base
- Used across different apps consumed by different teams
- Shared language between developers and designers

## Documentation and Storybook

Available at https://uikit.commercetools.com.

## Release

The release process is _semi-automated_: you only need to **manually** trigger it and [Travis][travis] will take care of the rest. All automated releases go the the `next` distribution channel. This gives us a chance to test releases out before making them offical by moving the `latest` dist-tag along.

### The steps to prepare and trigger a release to `next` are as follows:

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

### Moving the `latest` dist-tag to a release:

After testing the `next` release by upgrading an application, it's time to move the `latest` tag to make the release official. Use `npm dist-tag add @commercetools-frontend/ui-kit@<version> latest` to move the `latest` dist-tag onto that release.

## About release-candidates & alpha / beta versions

Having release candidates is not necesssary when using semantic releases:

> "With semantic-release it’s discouraged to put information about stability into the version number (i.e. 1.0.0-beta or 2.0.0-rc1) because it’s mixing things up. The tool you can use to comunicate stability are npm’s dist-tags. The last paragraph of this section should give you some hints: https://github.com/semantic-release/semantic-release#how-does-it-work"
>
> boennemann, [source](https://gitter.im/semantic-release/semantic-release/archives/2015/08/26)

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
