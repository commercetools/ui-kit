import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import Forms from './FORMS.md';
import Inputs from './INPUTS.md';
import Fields from './FIELDS.md';

storiesOf('Philosophy|Guide', module)
  .addParameters({ options: { showAddonPanel: false } })
  .add('Forms', doc(Forms))
  .add('Inputs', doc(Inputs))
  .add('Fields', doc(Fields));
