import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import { Value } from 'react-value';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import TimeInput from './time-input';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('TimeInput', () => (
    <Section>
      <Value
        defaultValue="17:12"
        render={(value, onChange) => (
          <div>
            <TimeInput
              id={text('id', '')}
              name={text('name', '')}
              placeholder={text('placeholder', 'Enter time')}
              isAutofocussed={boolean('isAutofocussed', false)}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              value={value}
              onChange={(event) => {
                action('onChange')(event);
                onChange(event.target.value);
              }}
              onFocus={action('onFocus')}
              onBlur={action('onBlur')}
              hasError={boolean('hasError', false)}
              horizontalConstraint={select(
                'horizontalConstraint',
                ['s', 'm', 'l', 'xl', 'scale'],
                'm'
              )}
            />
          </div>
        )}
      />
    </Section>
  ));
