import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
// import infoAddon from '@storybook/addon-info';

// setAddon(infoAddon);

import '../materials/reset.mod.css';
import './main.mod.css';

setOptions({
  name: 'MC Styleguide',
  url: 'https://mc.escemo.com/styleguide',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
  sortStoriesByKind: false,
  hierarchySeparator: '/',

  resolveStoryHierarchy: storyName => storyName.split('/'),
});

const req = require.context('../', true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
