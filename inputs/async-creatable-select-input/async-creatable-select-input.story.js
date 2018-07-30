import React from 'react';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import AsyncCreatableSelectInput from './async-creatable-select-input';

const colourOptions = [
  { label: 'Ocean', value: 'ocean' },
  { label: 'Blue', value: 'blue' },
  { label: 'Purple', value: 'purple' },
  { label: 'Red', value: 'red' },
  { label: 'Orange', value: 'orange' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Green', value: 'green' },
  { label: 'Forest', value: 'forest' },
  { label: 'Slate', value: 'slate' },
  { label: 'Silver', value: 'silver' },
];

const filterColors = inputValue =>
  colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('AsyncCreatableSelectInput', () => {
    const isMulti = boolean('isMulti', false);
    return (
      <React.Fragment>
        <Section>
          <IntlProvider locale="en">
            <Value
              key={isMulti}
              defaultValue={isMulti ? [] : undefined}
              render={(value, onChange) => (
                <AsyncCreatableSelectInput
                  cacheOptions
                  defaultOptions
                  loadOptions={promiseOptions}
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
                  isSearchable={boolean('isSearchable', true)}
                  isDisabled={boolean('isDisabled', false)}
                  isClearable={boolean('isClearable', true)}
                />
              )}
            />
          </IntlProvider>
        </Section>
      </React.Fragment>
    );
  });
