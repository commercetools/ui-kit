import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';
import {
  Text,
  Card,
  ContentNotification,
  Spacings,
  CheckboxInput,
} from '@commercetools-frontend/ui-kit';
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
        <Spacings.Stack>
          <Link
            tone={select('Tone', ['primary', 'inverted', 'secondary'])}
            to={text('to', '/foo/bar')}
            isExternal={boolean('isExternal', false)}
          >
            {text('label', 'Accessibility text')}
          </Link>
          <Text.Body>
            <Link tone="primary" to="/foo/bar" isExternal>
              text
            </Link>
          </Text.Body>
          <Card>
            <Link tone="primary" to="/foo/bar" isExternal>
              text
            </Link>
          </Card>
          <ContentNotification type="error">
            <Link tone="primary" to="/foo/bar" isExternal>
              text
            </Link>
          </ContentNotification>
          <CheckboxInput
            value="foo-radio-value"
            onChange={(event) => alert(event.target.value)}
            isChecked={true}
          >
            <Link tone="primary" to="/foo/bar" isExternal>
              text
            </Link>
          </CheckboxInput>
        </Spacings.Stack>
      </Section>
    </Router>
  ));
