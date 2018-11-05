import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import DateInput from './date-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('DateInput', () => (
    <Section>
      <Value
        defaultValue=""
        render={(value, onChange) => (
          <div>
            <DateInput
              id="foo"
              value={value}
              onChange={date => {
                action('onChange')(date);
                onChange(date);
              }}
              onFocus={action('onFocus')}
              onBlur={action('onBlur')}
              isClearable={boolean('isClearable', true)}
              horizontalConstraint={select(
                'horizontalConstraint',
                ['xs', 's', 'm', 'l', 'xl', 'scale'],
                'm'
              )}
              isDisabled={boolean('isDisabled', false)}
              hasError={boolean('hasError', false)}
              hasWarning={boolean('hasWarning', false)}
            />
            <pre>Value: {value}</pre>
          </div>
        )}
      />
    </Section>
  ));
