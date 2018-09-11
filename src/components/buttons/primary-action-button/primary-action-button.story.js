import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import * as icons from '../../icons';
import PrimaryActionButton from './primary-action-button';
import Readme from './README.md';

const iconNames = Object.keys(icons);

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('1. Primary Action', () => (
    <Section>
      <PrimaryActionButton
        id={text('id', '')}
        name={text('name', '')}
        ariaLabel={text('ariaLabel', '')}
        onClick={action('onClick')}
        isDisabled={boolean('isDisabled', false)}
        isToggled={boolean('isToggled', false)}
        icon={React.createElement(
          icons[select('icon', iconNames, iconNames[0])]
        )}
        type={select('type', ['button', 'submit', 'reset'], 'button')}
        size={select('size', ['small', 'big'], 'big')}
      >
        {text('children', 'Click me')}
      </PrimaryActionButton>
    </Section>
  ));
