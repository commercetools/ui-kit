import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import Section from '../../../../.storybook/decorators/section';
import * as icons from '../../icons';
import Readme from './README.md';
import SecondaryButton from './secondary-button';

const iconNames = Object.keys(icons);

storiesOf('Components|Buttons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('SecondaryButton', () => (
    <Section>
      <MemoryRouter>
        <SecondaryButton
          type={select('type', ['button', 'reset', 'submit'], 'button')}
          theme={select('theme', ['blue', 'default'], 'default')}
          iconLeft={React.createElement(
            icons[select('iconLeft', iconNames, iconNames[0])]
          )}
          onClick={action('onClick')}
          label={text('label', 'Accessibility text')}
          isToggleButton={boolean('isToggleButton', false)}
          isToggled={boolean('isToggled', false)}
          isDisabled={boolean('isDisabled', false)}
          linkTo={text('linkTo')}
        />
      </MemoryRouter>
    </Section>
  ));
