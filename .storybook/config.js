import {
  configure,
  setAddon,
  addDecorator,
  getStorybook,
} from '@storybook/react';
import createPercyAddon from '@percy-io/percy-storybook';
import { withOptions } from '@storybook/addon-options';
import IntlDecorator from './decorators/intl';
import './main.mod.css';

const { percyAddon, serializeStories } = createPercyAddon();
setAddon(percyAddon);

const srcStories = require.context('../src', true, /\.story\.js$/);
const materialsStories = require.context('../materials', true, /\.story\.js$/);
const exampleStories = require.context('../examples', true, /\.story\.js$/);

function loadStories() {
  srcStories.keys().forEach(filename => srcStories(filename));
  materialsStories.keys().forEach(filename => materialsStories(filename));
  exampleStories.keys().forEach(filename => exampleStories(filename));
}

addDecorator(IntlDecorator);

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

configure(loadStories, module);

// NOTE: if you're using the Storybook options addon, call serializeStories
//       *BEFORE* the setOptions call
serializeStories(getStorybook);
