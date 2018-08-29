import React from 'react';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import AsyncSelectInput from './async-select-input';

const colourOptions = [
  { label: 'Ocean', value: 'ocean', someData: 1 },
  { label: 'Blue', value: 'blue', someData: 2 },
  { label: 'Purple', value: 'purple', someData: 3 },
  { label: 'Red', value: 'red', someData: 4 },
  { label: 'Orange', value: 'orange', someData: 5 },
  { label: 'Yellow', value: 'yellow', someData: 6 },
  { label: 'Green', value: 'green', someData: 7 },
  { label: 'Forest', value: 'forest', someData: 8 },
  { label: 'Slate', value: 'slate', someData: 9 },
  { label: 'Silver', value: 'silver', someData: 10 },
];

const filterColors = inputValue =>
  colourOptions.filter(colourOption =>
    colourOption.label.toLowerCase().includes(inputValue.toLowerCase())
  );

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const promiseOptions = inputValue =>
  delay(500).then(() => filterColors(inputValue));

class SelectStory extends React.Component {
  static displayName = 'SelectStory';
  render() {
    const isMulti = boolean('isMulti', false);
    const defaultOptions = boolean('defaultOptions', true)
      ? colourOptions
      : false;
    return (
      <React.Fragment>
        <Section>
          <IntlProvider locale="en">
            <Value
              key={`${isMulti}-${defaultOptions}`}
              defaultValue={isMulti ? [] : undefined}
              render={(value, onChange) => (
                <div>
                  <AsyncSelectInput
                    name={text('name', 'form-field-name')}
                    isMulti={isMulti}
                    isClearable={boolean('isClearable', true)}
                    createOptionPosition={select(
                      'createOptionPosition',
                      ['first', 'last'],
                      'last'
                    )}
                    cacheOptions
                    value={value}
                    onChange={(event, info) => {
                      action('onChange')(event, info);
                      onChange(event.target.value);
                    }}
                    onBlur={action('onBlur')}
                    loadOptions={promiseOptions}
                    defaultOptions={defaultOptions}
                    horizontalConstraint={select(
                      'horizontalConstraint',
                      ['xs', 's', 'm', 'l', 'xl', 'scale'],
                      'scale'
                    )}
                    placeholder={text('placeholder', 'Select..')}
                    isDisabled={boolean('isDisabled', false)}
                  />
                </div>
              )}
            />
          </IntlProvider>
        </Section>
      </React.Fragment>
    );
  }
}

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('AsyncSelectInput', () => <SelectStory />);
