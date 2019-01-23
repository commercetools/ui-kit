import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import * as icons from '../../icons';
import Readme from './README.md';
import PrimaryButton from './primary-button';

const iconNames = Object.keys(icons);

storiesOf('Components|Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('PrimaryButton', () => {
    const selectedIcon = select('iconLeft', ['', ...iconNames], iconNames[0]);
    return (
      <Section>
        <PrimaryButton
          type={select('type', ['submit', 'reset', 'button'], 'button')}
          tone={select('tone', ['urgent', 'primary'], 'primary')}
          size={select('size', ['small', 'big'], 'big')}
          {...(selectedIcon
            ? { iconLeft: React.createElement(icons[selectedIcon]) }
            : {})}
          label={text('label', 'Accessibility text')}
          isToggleButton={boolean('isToggleButton', false)}
          isToggled={boolean('isToggled', false)}
          isDisabled={boolean('isDisabled', false)}
          onClick={action('onClick')}
        />
      </Section>
    );
  });
