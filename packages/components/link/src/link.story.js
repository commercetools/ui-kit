import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import Link from './link';

storiesOf('Components|Links', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Link', () => (
    <Router>
      <Section>
        <Link
          tone={select('Tone', ['primary', 'inverted', 'secondary'])}
          to={text('to', '/foo/bar')}
          isExternal={boolean('isExternal', false)}
        >
          {text('label', 'Accessibility text')}
        </Link>
      </Section>
    </Router>
  ));
