import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import { Value } from 'react-value';
import withReadme from 'storybook-readme/with-readme';
import Spacings from '../../spacings';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import CheckboxInput from './checkbox-input';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('CheckboxInput', () => (
    <Section>
      <Spacings.Stack>
        <Value
          defaultValue={false}
          render={(checked, onChange) => (
            <CheckboxInput
              id={text('id', '')}
              name={text('name', '')}
              onChange={event => {
                action('onChange')(event);
                onChange(!checked);
              }}
              value={text('value', '')}
              checked={boolean('checked', checked)}
              isIndeterminate={boolean('isIndeterminate', false)}
              isHovered={boolean('isHovered', false)}
              disabled={boolean('disabled', false)}
              hasError={boolean('hasError', false)}
            >
              {text('Label', 'This is a label')}
            </CheckboxInput>
          )}
        />
      </Spacings.Stack>
    </Section>
  ));
