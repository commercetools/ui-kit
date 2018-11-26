import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import Icons from '../../icons';
import Readme from './README.md';
import GhostButton from './ghost-button';

const iconNames = Object.keys(Icons);

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('GhostButton', () => (
    <Section>
      <GhostButton
        iconLeft={React.createElement(
          Icons[select('iconLeft', iconNames, iconNames[0])]
        )}
        label={text('label', 'Accessibility text')}
        isToggleButton={boolean('isToggleButton', false)}
        isToggled={boolean('isToggled', false)}
        isDisabled={boolean('isDisabled', false)}
        onClick={action('onClick')}
      />
    </Section>
  ));
