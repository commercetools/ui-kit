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
          onChange={action('onChange')}
          value="foo-value"
          isDisabled={boolean('isDisabled', false)}
          isChecked={boolean('isChecked', false)}
          isIndeterminate={boolean('isIndeterminate', false)}
          hasError={boolean('hasError', false)}
        >
          {text('Label', 'This is a label')}
        </Checkbox>
      </Spacings.Stack>
    </Section>
  ));
