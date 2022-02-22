import { createElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import * as icons from '@commercetools-uikit/icons';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import LinkButton from './link-button';

const iconNames = Object.keys(icons);

storiesOf('Components|Buttons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('LinkButton', () => (
    <Router>
      <Section>
        <LinkButton
          label={text('label', 'Accessibility text')}
          to={text('to', '/foo/bar')}
          iconLeft={createElement(
            icons[select('icon', iconNames, iconNames[0])]
          )}
          isDisabled={boolean('isDisabled', false)}
          isExternal={boolean('isExternal', false)}
        />
      </Section>
    </Router>
  ));
