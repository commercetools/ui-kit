import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import GettingStarted from '../README.md';

storiesOf('Introduction', module)
  .addParameters({ options: { showAddonPanel: false } })
  .add('Getting Started', doc(GettingStarted));
