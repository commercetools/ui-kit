import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import { BrowserRouter as Router } from 'react-router-dom';
// import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import Link from './link';

storiesOf('Components|Links', module)
  .addDecorator(withKnobs)
  // .addDecorator(withReadme(Readme))
  .add('Link', () => (
    <Router>
      <Section>
        <Link
          to={text('to', '/foo/bar')}
          isExternal={boolean('isExternal', false)}
        >
          {text('label', 'Accessibility text')}
        </Link>
      </Section>
    </Router>
  ));
