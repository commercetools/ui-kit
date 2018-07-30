import React from 'react';
import { Value } from 'react-value';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import LinkTo from '@storybook/addon-links/react';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import SelectInput from './select-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('SelectInput', () => {
    const options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ];
    const isMulti = boolean('isMulti', false);
    return (
      <React.Fragment>
        <Section>
          <IntlProvider locale="en">
            <Value
              key={isMulti}
              defaultValue={isMulti ? [] : undefined}
              render={(value, onChange) => (
                <SelectInput
                  horizontalConstraint={select(
                    'horizontalConstraint',
                    ['xs', 's', 'm', 'l', 'xl', 'scale'],
                    'scale'
                  )}
                  name={text('name', 'form-field-name')}
                  value={value}
                  onChange={(event, ...args) => {
                    action('onChange')(event, ...args);
                    onChange(event.target.value);
                  }}
                  onBlur={action('onBlur')}
                  isMulti={isMulti}
                  placeholder={text('placeholder', 'Select..')}
                  isSearchable={boolean('isSearchable', false)}
                  isDisabled={boolean('isDisabled', false)}
                  isClearable={boolean('isClearable', false)}
                  options={options}
                />
              )}
            />
          </IntlProvider>
        </Section>
        <Section>
          <LinkTo kind="Examples|Forms" story="SelectInput">
            See form example
          </LinkTo>
        </Section>
      </React.Fragment>
    );
  });
