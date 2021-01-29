import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as icons from '@commercetools-uikit/icons';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import LinkButton from './link-button';

const iconNames = Object.keys(icons);

storiesOf('Components|Buttons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('LinkButton', () => (
    <Router>
      <Section>
        <LinkButton
          to={text('to', '/foo/bar')}
          label={text('label', 'Accessibility text')}
          iconLeft={React.createElement(
            icons[select('iconLeft', iconNames, iconNames[0])]
          )}
          isDisabled={boolean('isDisabled', false)}
          isExternal={boolean('isExternal', false)}
        />
      </Section>
    </Router>
  ));
