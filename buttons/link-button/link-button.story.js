import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-router';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import * as icons from '../../icons';
import Readme from './README.md';
import LinkButton from './link-button';

const iconNames = Object.keys(icons);

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .addDecorator(StoryRouter())
  .add('LinkButton', () => (
    <Section>
      <LinkButton
        to={text('to', '/foo/bar')}
        label={text('label', 'Accessibility text')}
        iconLeft={React.createElement(
          icons[select('icon', iconNames, iconNames[0])]
        )}
        isDisabled={boolean('isDisabled', false)}
      />
    </Section>
  ));
