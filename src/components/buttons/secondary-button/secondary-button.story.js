import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import Icons from '../../icons';
import Readme from './README.md';
import SecondaryButton from './secondary-button';

const iconNames = Object.keys(Icons);

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('SecondaryButton', () => (
    <Section>
      <MemoryRouter>
        <SecondaryButton
          theme={select('theme', ['blue', 'default'], 'default')}
          iconLeft={React.createElement(
            Icons[select('iconLeft', iconNames, iconNames[0])]
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
