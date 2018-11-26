import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import Icons from '../../icons';
import Readme from './README.md';
import SecondaryIconButton from './secondary-icon-button';

const iconNames = Object.keys(Icons);

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('SecondaryIconButton', () => (
    <Section>
      <SecondaryIconButton
        icon={React.createElement(
          Icons[select('icon', iconNames, iconNames[0])]
        )}
        onClick={action('onClick')}
        label={text('label', 'Accessibility text')}
        isDisabled={boolean('isDisabled?', false)}
      />
    </Section>
  ));
