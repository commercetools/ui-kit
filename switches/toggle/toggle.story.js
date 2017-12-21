import React from 'react';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Spacings from '../../materials/spacings';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import Toggle from './';

storiesOf('Switches', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Toggle', () => (
    <Section>
      <Spacings.Stack>
        <Value
          defaultValue={false}
          render={(value, onChange) => (
            <Spacings.Inline alignItems="center">
              <Toggle
                size={select('size', ['small', 'big'], 'big')}
                isDisabled={false}
                isChecked={value}
                onChange={onChange}
              />
              <label>Default</label>
            </Spacings.Inline>
          )}
        />
        <Value
          defaultValue={true}
          render={(value, onChange) => (
            <Spacings.Inline alignItems="center">
              <Toggle
                size={select('size', ['small', 'big'], 'big')}
                isDisabled={boolean('isSecondToggleDisabled', true)}
                isChecked={value}
                onChange={onChange}
              />
              <label>Default Disabled</label>
            </Spacings.Inline>
          )}
        />
      </Spacings.Stack>
    </Section>
  ));
