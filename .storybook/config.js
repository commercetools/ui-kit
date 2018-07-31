import { configure, setAddon, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import IntlDecorator from './decorators/intl';
// import infoAddon from '@storybook/addon-info';

// setAddon(infoAddon);

import '../materials/reset.mod.css';
import './main.mod.css';

setOptions({
  name: 'MC Styleguide',
  url: 'https://mc.escemo.com/styleguide',
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

const req = require.context('../', true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(IntlDecorator);

configure(loadStories, module);
