import { addParameters, configure, addDecorator } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { addReadme } from 'storybook-readme';
import { withA11y } from '@storybook/addon-a11y';
import { create } from '@storybook/theming';
import { contexts } from './configs/contexts';

addParameters({
  readme: {
    // You can set a code theme globally.
    codeTheme: 'github',
  },
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'UI Kit',
      brandUrl: 'https://uikit.commercetools.com',
      // To control appearance:
      brandImage:
        'https://unpkg.com/@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.png',
    }),
    isFullScreen: false,
    panelPosition: 'right',
    showNav: true,
    showPanel: true,
    sortStoriesByKind: false,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
  },
});

const srcStories = require.context('../src', true, /\.story\.js$/);
const packagesStories = require.context('../packages', true, /\.story\.js$/);
const materialsStories = require.context(
  '../design-system/materials',
  true,
  /\.story\.js$/
);
const exampleStories = require.context('../examples', true, /\.story\.js$/);
const srcExampleStories = require.context(
  '../src',
  true,
  /\.example.story\.js$/
);
const packagesExampleStories = require.context(
  '../packages',
  true,
  /\.example.story\.js$/
);
const philosophyStories = require.context(
  '../philosophy',
  true,
  /\.story\.js$/
);

function loadStories() {
  require('./welcome.story');
  philosophyStories.keys().forEach(filename => philosophyStories(filename));
  materialsStories.keys().forEach(filename => materialsStories(filename));
  srcStories.keys().forEach(filename => srcStories(filename));
  packagesStories.keys().forEach(filename => packagesStories(filename));
  exampleStories.keys().forEach(filename => exampleStories(filename));
  srcExampleStories.keys().forEach(filename => srcExampleStories(filename));
  packagesExampleStories
    .keys()
    .forEach(filename => packagesExampleStories(filename));
}

addDecorator(addReadme);
addDecorator(withContexts(contexts));
addDecorator(withA11y);

configure(loadStories, module);
