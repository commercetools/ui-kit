import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react';
import Section from '../../../../.storybook/decorators/section';
import * as icons from '../../icons';
import Readme from './README.md';
import IconButton from './icon-button';

const iconNames = Object.keys(icons);

storiesOf('Components|Buttons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('IconButton', () => (
    <Section>
      <IconButton
        type={select('type', ['submit', 'reset', 'button'], 'button')}
        shape={select('shape', ['round', 'square'], 'round')}
        size={select('size', ['big', 'medium', 'small'], 'big')}
        theme={select('theme', ['green', 'blue', 'default'], 'default')}
        icon={React.createElement(
          icons[select('icon', iconNames, iconNames[0])]
        )}
        onClick={action('onClick')}
        label={text('label', 'Accessibility text')}
        isToggleButton={boolean('isToggleButton', false)}
        isToggled={boolean('isToggled', false)}
        isDisabled={boolean('isDisabled?', false)}
      />
    </Section>
  ));
