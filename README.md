<h2 align="center">commercetools UIKit 💅</h2>
<p align="center">
  <i>Design System component library</i>
</p>

<h2 align="center">🚧 Under construction 🚧</h2>

## Install

```bash
$ npm install --save @commercetools-frontend/ui-kit

$ yarn add @commercetools-frontend/ui-kit
```

The package main exports contains all the UI components.

```js
import {
  Text,
  TextInput,
  PrimaryButton,
  // etc.
} from '@commercetools-frontend/ui-kit';
```

#### Importing CSS modules

In order to make use of our CSS variables defined in our CSS module files, you can require those files (from `/materials`) within your `.mod.css` files:

```css
@import '@commercetools-frontend/ui-kit/materials/spacings.mod.css';

.container {
  padding: var(--spacing-8);
}
```

> Please look into the package itself to inspect what variables are available (_documentation will be provided in the future_)

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

## Documentation

_coming soon_

## Release

The relase process is _semi-automated_: you only need to **manually** trigger it and [Travis][travis] will take care of the rest.

The steps to prepare and trigger a release are the following:

- ensure to be on the latest `master` branch
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

By default, only _Deploy Previews_ (Pull Requests) are deployed to [Netlify][netlify]. The _Production_ website is deployed from the branch `docs-production`.

> The reason for not having continuous deployment from `master` branch is to keep it the same as the _latest_ release.

Deployments for `docs-production` are automatically triggered from [Travis][travis] after the release was triggered (via **git tags**). [Travis][travis] will execute the `yarn docs:publish` command to update the production branch, which will trigger a deployment from [Netlify][netlify]

[storybook]: https://storybook.js.org/
[netlify]: https://www.netlify.com
[travis]: https://travis-ci.org/commercetools/ui-kit
