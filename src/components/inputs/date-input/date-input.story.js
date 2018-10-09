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
        defaultValue="2007-03-18"
        render={(value, onChange) => (
          <div>
            <DateInput
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
            />
            <pre>Value: {value}</pre>
          </div>
        )}
      />
    </Section>
  ));
