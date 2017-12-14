import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
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
        <Toggle
          size={select('size', ['small', 'big'], 'big')}
          isDisabled={false}
          isChecked={boolean('isFirstToggleChecked', false)}
          onChange={action('onChange: first')}
        >
          <Toggle.On>Simple Toggled</Toggle.On>
          <Toggle.Off>Simple</Toggle.Off>
        </Toggle>
        <Toggle
          size={select('size', ['small', 'big'], 'big')}
          isDisabled={boolean('isSecondToggleDisabled', true)}
          isChecked={false}
          onChange={action('onChange: second')}
        >
          <Toggle.On>Simple Disabled Toggled</Toggle.On>
          <Toggle.Off>Simple Disabled</Toggle.Off>
        </Toggle>
        <Toggle
          size={select('size', ['small', 'big'], 'big')}
          isDisabled={false}
          isChecked={boolean('isThirdToggleChecked', true)}
          onChange={action('onChange: third')}
        >
          <Toggle.On>{text('Label of third toggle on', 'Toggled')}</Toggle.On>
          <Toggle.Off>
            {text('Label of third toggle off', 'Toggle off')}
          </Toggle.Off>
        </Toggle>
        <Toggle
          size={select('size', ['small', 'big'], 'big')}
          isDisabled={true}
          isChecked={true}
          onChange={action('onChange: fourth')}
        >
          <Toggle.On>
            {text('Label of fourth toggle on', 'Toggled && Disabled')}
          </Toggle.On>
          <Toggle.Off>
            {text('Label of fourth toggle off', 'Toggled && Disabled')}
          </Toggle.Off>
        </Toggle>
      </Spacings.Stack>
    </Section>
  ));
