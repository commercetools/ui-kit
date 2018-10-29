import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import DateRangeInput from './date-range-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('DateRangeInput', () => (
    <Section>
      <Value
        defaultValue={[]}
        render={(value, onChange) => (
          <div>
            <DateRangeInput
              value={value}
              onChange={date => {
                action('onChange')(date);
                onChange(date);
              }}
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
            {value && (
              <React.Fragment>
                <pre>From: {value[0]}</pre>
                <pre>To: {value[1]}</pre>
              </React.Fragment>
            )}
          </div>
        )}
      />
    </Section>
  ));
