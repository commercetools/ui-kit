import { configure, setAddon, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import IntlDecorator from './decorators/intl';
// import infoAddon from '@storybook/addon-info';

// setAddon(infoAddon);

import '../materials/reset.mod.css';
import './main.mod.css';

setOptions({
  name: 'MC Styleguide',
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
});

const srcStories = require.context('../src', true, /\.story\.js$/);
const materialsStories = require.context('../materials', true, /\.story\.js$/);
const exampleStories = require.context('../examples', true, /\.story\.js$/);

function loadStories() {
  srcStories.keys().forEach(filename => srcStories(filename));
  materialsStories.keys().forEach(filename => materialsStories(filename));
  exampleStories.keys().forEach(filename => exampleStories(filename));
}

addDecorator(IntlDecorator);

configure(loadStories, module);
