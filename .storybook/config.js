import { addParameters, configure, addDecorator } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { create } from '@storybook/theming';
import { contexts } from './configs/contexts'; // we will define the contextual setups later in API section
import IntlDecorator from './decorators/intl';

addParameters({
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
const materialsStories = require.context('../materials', true, /\.story\.js$/);
const exampleStories = require.context('../examples', true, /\.story\.js$/);
const srcExampleStories = require.context(
  '../src',
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
  exampleStories.keys().forEach(filename => exampleStories(filename));
  srcExampleStories.keys().forEach(filename => srcExampleStories(filename));
}

addDecorator(IntlDecorator);

addDecorator(withContexts(contexts));

configure(loadStories, module);
