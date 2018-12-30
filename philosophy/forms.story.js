import React from 'react';
import { storiesOf } from '@storybook/react';
// import withReadme from 'storybook-readme/with-readme';
// import TextInputReadme from './README.md';

storiesOf('Philosophy|Guide', module)
  // .addDecorator(withReadme(TextInputReadme))
  .add('Forms', () => <p>Forms!</p>);
