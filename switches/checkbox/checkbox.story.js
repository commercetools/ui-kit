import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Spacings from '../../materials/spacings';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import Checkbox from './';

storiesOf('Switches', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Checkbox', () => (
    <Section>
      <Spacings.Stack>
        <Checkbox
          isDisabled={boolean('isFirstCheckboxDisabled', false)}
          isChecked={boolean('isFirstCheckboxChecked', true)}
          onChange={action('onChange: first')}
          value="foo-value"
        >
          {text('Label of primary action', 'Primary checkbox')}
        </Checkbox>
        <Checkbox
          isDisabled={boolean('isSecondCheckboxDisabled', false)}
          onChange={action('onChange: second')}
          value="bar-value"
        >
          {text('Label of second action', 'Second checkbox')}
        </Checkbox>
        <Checkbox
          isDisabled={boolean('isThirdCheckboxDisabled', true)}
          onChange={action('onChange: third')}
          value="baz-value"
        >
          {text('Label of third action', 'Third checkbox')}
        </Checkbox>
        <Checkbox
          isDisabled={boolean('isFourthCheckboxDisabled', false)}
          isChecked={boolean('isFourthCheckboxChecked', false)}
          onChange={action('onChange: fourth')}
          value="x-value"
          isIndeterminate={boolean('isFourthCheckboxIndeterminate', true)}
        >
          {text('Label of fourth action', 'Fourth checkbox')}
        </Checkbox>
      </Spacings.Stack>
    </Section>
  ));
