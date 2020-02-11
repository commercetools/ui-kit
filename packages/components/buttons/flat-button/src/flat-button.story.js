import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import * as icons from '@commercetools-uikit/icons';
import Section from '../../../../../.storybook/decorators/section';
import Readme from '../README.md';
import FlatButton from './flat-button';

const iconNames = Object.keys(icons);

storiesOf('Components|Buttons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('FlatButton', () => (
    <Section>
      <FlatButton
        type={select('type', ['submit', 'reset', 'button'], 'button')}
        tone={select('tone', ['primary', 'secondary', 'inverted'], 'primary')}
        label={text('label', 'Accessibility text')}
        icon={React.createElement(
          icons[select('icon', iconNames, iconNames[0])]
        )}
        iconPosition={select('icon position', ['left', 'right'], 'left')}
        onClick={action('onClick')}
        isDisabled={boolean('isDisabled', false)}
        as={select('as', ['button', 'a', 'span'], 'button')}
      />
    </Section>
  ));
