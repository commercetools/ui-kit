import '@commercetools-uikit/design-system/materials/resets.css';
import { addParameters, configure, addDecorator } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { addReadme } from 'storybook-readme';
import { withA11y } from '@storybook/addon-a11y';
import { create } from '@storybook/theming';
import { contexts } from './configs/contexts';
import { ThemeWrapper } from './decorators';

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
    storySort: (a, b) => {
      // Not sure if this is the correct way to do it, but the "Introduction" story
      // should be loaded first.
      if (a[1].kind === 'Introduction') return 0;
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true });
    },
  },
});

const packagesStories = require.context('../../packages', true, /\.story\.js$/);
const materialsStories = require.context(
  '../../design-system/materials',
  true,
  /\.story\.js$/
);
const exampleStories = require.context('../examples', true, /\.story\.js$/);
const packagesExampleStories = require.context(
  '../../packages',
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
  philosophyStories.keys().forEach((filename) => philosophyStories(filename));
  materialsStories.keys().forEach((filename) => materialsStories(filename));
  packagesStories.keys().forEach((filename) => packagesStories(filename));
  exampleStories.keys().forEach((filename) => exampleStories(filename));
  packagesExampleStories
    .keys()
    .forEach((filename) => packagesExampleStories(filename));
}

addDecorator(addReadme);
addDecorator(withContexts(contexts));
addDecorator(withA11y);
addDecorator(ThemeWrapper);

configure(loadStories, module);
