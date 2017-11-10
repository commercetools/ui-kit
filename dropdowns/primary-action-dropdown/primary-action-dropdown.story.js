import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import * as icons from './../../icons';
import Readme from './README.md';
import PrimaryActionDropdown, { Option } from './primary-action-dropdown';

const iconNames = Object.keys(icons);

storiesOf('Dropdowns', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('PrimaryActionDropdown', () => (
    <Section>
      <PrimaryActionDropdown>
        <Option
          iconLeft={React.createElement(
            icons[select('icon', iconNames, iconNames[0])]
          )}
          isDisabled={boolean('isPrimaryOptionDisabled', false)}
          onClick={action('onClick primary option')}
        >
          {text('Label of primary action', 'Primary option')}
        </Option>
        <Option
          isDisabled={boolean('isSecondOptionDisabled', false)}
          onClick={action('onClick second option')}
        >
          {text('Label of second action', 'Second option')}
        </Option>
        <Option
          isDisabled={boolean('isThirdOptionDisabled', false)}
          onClick={action('onClick third option')}
        >
          {text('Label of third action', 'Third option')}
        </Option>
      </PrimaryActionDropdown>
    </Section>
  ));
