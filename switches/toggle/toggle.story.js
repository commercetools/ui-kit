import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
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
        <Toggle.Toggle
          isDisabled={false}
          isChecked={boolean('isFirstToggleChecked', false)}
          onChange={action('onChange: first')}
        >
          <Toggle.On>
            {text('Label of first toggle', 'Simple Toggled')}
          </Toggle.On>
          <Toggle.Off>{text('Label of first toggle', 'Simple')}</Toggle.Off>
        </Toggle.Toggle>
        <Toggle.Toggle
          isDisabled={boolean('isSecondToggleDisabled', true)}
          isChecked={false}
          onChange={action('onChange: second')}
        >
          <Toggle.On>
            {text('Label of second toggle', 'Simple Disabled Toggled')}
          </Toggle.On>
          <Toggle.Off>
            {text('Label of second toggle', 'Simple Disabled')}
          </Toggle.Off>
        </Toggle.Toggle>
        <Toggle.Toggle
          isDisabled={false}
          isChecked={boolean('isThirdToggleChecked', true)}
          onChange={action('onChange: third')}
        >
          <Toggle.On>{text('Label of third toggle', 'Toggled')}</Toggle.On>
          <Toggle.Off>{text('Label of third toggle', 'Toggle off')}</Toggle.Off>
        </Toggle.Toggle>
        <Toggle.Toggle
          isDisabled={true}
          isChecked={true}
          onChange={action('onChange: fourth')}
        >
          <Toggle.On>
            {text('Label of fourth toggle', 'Toggled && Disabled')}
          </Toggle.On>
          <Toggle.Off>
            {text('Label of fourth toggle', 'Toggled && Disabled')}
          </Toggle.Off>
        </Toggle.Toggle>
      </Spacings.Stack>
    </Section>
  ));
