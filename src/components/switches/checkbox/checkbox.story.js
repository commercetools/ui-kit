import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import withReadme from 'storybook-readme/with-readme';
import Spacings from '../../spacings';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import Checkbox from '.';

storiesOf('Switches', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Checkbox', () => (
    <Section>
      <Spacings.Stack>
        <Value
          render={(value, onChange) => (
            <Checkbox
              onChange={event => {
                action('onChange')(event);
                onChange(event.target.value);
              }}
              value={value}
              isChecked={boolean('isChecked', false)}
              isIndeterminate={boolean('isIndeterminate', false)}
              isHovered={boolean('isHovered', false)}
              isDisabled={boolean('isDisabled', false)}
              hasError={boolean('hasError', false)}
            >
              {text('Label', 'This is a label')}
            </Checkbox>
          )}
        />
      </Spacings.Stack>
    </Section>
  ));
