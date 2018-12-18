import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import TimeInput from './time-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
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
              value={text('value', value)}
              onChange={event => {
                action('onChange')(event);
                onChange(event.target.value);
              }}
              onFocus={action('onFocus')}
              onBlur={action('onBlur')}
              hasError={boolean('hasError', false)}
              horizontalConstraint={select(
                'horizontalConstraint',
                ['xs', 's', 'm', 'l', 'xl', 'scale'],
                'm'
              )}
            />
          </div>
        )}
      />
    </Section>
  ));
