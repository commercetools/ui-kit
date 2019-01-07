import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import Forms from './FORMS.md';

storiesOf('Philosophy|Guide', module)
  .addParameters({ options: { showAddonPanel: false } })
  .add('Forms', doc(Forms));
