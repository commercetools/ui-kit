import { configure, setAddon, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import IntlDecorator from './decorators/intl';
// import infoAddon from '@storybook/addon-info';

// setAddon(infoAddon);

addDecorator(
  withOptions({
    name: 'UI Kit',
    url: 'https://uikit.commercetools.com',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
    sortStoriesByKind: false,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,

    resolveStoryHierarchy: storyName => storyName.split('/'),
  })
);

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

configure(loadStories, module);
