import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import * as icons from '../../icons';
import Readme from './README.md';
import PrimaryButton from './primary-action-button';

const iconNames = Object.keys(icons);

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('PrimaryActionButton', () => (
    <Section>
      <PrimaryButton
        id={text('id', 'id')}
        name={text('name', 'name')}
        size={select('size', ['small', 'big'], 'big')}
        iconLeft={React.createElement(
          icons[select('iconLeft', iconNames, iconNames[0])]
        )}
        label={text('label', 'Click me')}
        isToggled={boolean('isToggled', false)}
        isDisabled={boolean('isDisabled', false)}
        onClick={action('onClick')}
      />
    </Section>
  ));
