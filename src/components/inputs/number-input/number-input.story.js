import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import { Value } from 'react-value';
import Section from '../../../../.storybook/decorators/section';
import NumberInputReadme from './README.md';
import NumberInput from './number-input';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(NumberInputReadme))
  .add('NumberInput', () => {
    const min = text('min', '');
    const max = text('max', '');
    const step = text('step', '');
    return (
      <Section>
        <Value
          defaultValue={''}
          render={(value, onChange) => (
            <NumberInput
              id={text('id', '')}
              name={text('name', '')}
              value={value}
              onChange={(event, ...args) => {
                action('onChange')(event, ...args);
                onChange(event.target.value);
              }}
              onBlur={action('onBlur')}
              min={min.trim() === '' ? undefined : parseInt(min, 10)}
              max={max.trim() === '' ? undefined : parseInt(max, 10)}
              step={step.trim() === '' ? undefined : parseFloat(step, 10)}
              isAutofocussed={boolean('isAutofocussed', false)}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              hasError={boolean('hasError', false)}
              hasWarning={boolean('hasWarning', false)}
              placeholder={text('placeholder', 'Placeholder')}
              horizontalConstraint={select(
                'horizontalConstraint',
                ['xs', 's', 'm', 'l', 'xl', 'scale'],
                'm'
              )}
            />
          )}
        />
      </Section>
    );
  });
