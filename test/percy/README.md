# Visual regression testing with Percy

We use visual regression testing to avoid inadvertently introducing visual regressions.

This works by taking screenshots of our components in different states. When changes are made, they get compared to the baseline on CI by [Percy](https://percy.io/). In case changes are detected, the CI check will fail unless somebody approves the changes on the Percy website.

## Constraints

### Where to place visual regression tests

All visual regression tests have to be written in files ending in `.percy.js`. Percy detects these files and compiles them using their own webpack configuration. No special configuration (like custom loaders) is necessary as we use the bundled version of ui-kit.

### Why we test the bundle

We use the bundled ui-kit to ensure that rollup bundling is working well. This allows us to quickly ensure changes to the rollup build don't break the visuals of our components.

### Why we group multiple states into one snapshot

When writing visual regression tests we need to ensure that we stay within our monthly budget of visual diffs on Percy. Every time a screenshot is taken for a specific browser and a specific viewport it counts as one _visual diff_. Another factor to consider is that we want to ensure that Percy completes in a timely manner. Taking one snapshot takes around 3 seconds. If we take one snapshot for every state of every component, then it quickly adds up to over 45 minutes to complete a single test run. We therefore render one component in many states in a single snapshot. We also limit ourselves to one browser and one viewport size to reduce the number of visual diffs created per test run.

### Why we can't interact with components before taking snapshots

At the time of writing we can not interact with components before taking a screenshot. The only way to manipulate a component is to pass props. Interaction is not possible: for example, we can't open a dropdown by clicking on it before taking a screenshot. This is accepted as a downside for now. It doesn't seem like any Visual Regression Testing service is offering this capability yet (without falling back to Cypress).

## Adding Visual Regression Tests

Below is an example of how to add Visual Regression Tests. This section also demonstrates the components we've built to ease writing tests.

All percy tests must import from the bundled ui-kit. This rule is introduced to ensure that the rollup build chain is tested as well - which gives us more confidence when making changes to rollup itself.

```js
// primary-button.percy.js

import { PrimaryButton } from '../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../test/percy';

screenshot('PrimaryButton', () => (
  <Suite>
    <Spec label="in default state">
      <PrimaryButton label="Primary button" />
    </Spec>
    <Spec label="when disabled">
      <PrimaryButton disabled={true} label="Primary button" />
    </Spec>
  </Suite>
));
```

### `screenshot`

Usually when writing tests for Percy you'd call `percySnapshot('label', options, () => <Foo />)`. As we want to always use the same options (the same viewport), we export a preconfigured `screenshot` function which provides the options out of the box.

You should only use one `screenshot` per component to keep the total number of visual diffs low. This in turn keeps the runtime low and avoids us hitting the monthly budget of visual diffs.

### `Suite`

The `Suite` sets up the context (`react-intl` and `react-router`) for the tests. It should always be rendered even when your component doesn't access these things.

You should only use one `Suite` per `screenshot` as there is no point in defining multiple `Suites` since you only need the context to be set up once (usually). An exception might be if you want to render your component in multiple locales.

### `Spec`

A `Spec` should render your component in a specific state.

You can use multiple specs within a `Suite`.

## Local development (rarely used)

Usually, you'd let Percy run for your PRs on CI. There is no need to run it locally. However, if you ever need to run Percy locally (e.g. to debug our Percy setup), you can follow the steps described [here](https://docs.percy.io/docs/local-development).

In short:

```bash
# Get the token from ui-kit's settings on percy.io
export PERCY_TOKEN=aaabbbcccdddeeefff
# Set the branch to local so that it uses the correct baseline
export PERCY_BRANCH=local

# Run percy. Once it's done it will print a URL where you
# can review the visual diffs.
yarn percy
```
