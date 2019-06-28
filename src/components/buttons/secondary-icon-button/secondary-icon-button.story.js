import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react';
import Section from '../../../../.storybook/decorators/section';
import * as icons from '../../icons';
import Readme from './README.md';
import SecondaryIconButton from './secondary-icon-button';

const iconNames = Object.keys(icons);

storiesOf('Components|Buttons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('SecondaryIconButton', () => (
    <Section>
      <SecondaryIconButton
        icon={React.createElement(
          icons[select('icon', iconNames, iconNames[0])]
        )}
        label={text('label', 'Accessibility text')}
        color={select('color', ['solid', 'primary'], 'solid')}
        onClick={action('onClick')}
        isDisabled={boolean('isDisabled', false)}
      />
    </Section>
  ));
