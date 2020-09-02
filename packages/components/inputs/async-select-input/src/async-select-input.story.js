import React from 'react';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  text,
  select,
  number,
} from '@storybook/addon-knobs/react';
import Section from '../../../../../.storybook/decorators/section';
import Readme from '../README.md';
import AsyncSelectInput from './async-select-input';
import * as icons from '../../../icons';

const iconNames = Object.keys(icons);

const colourOptions = [
  {
    options: [
      { label: 'Ocean', value: 'ocean', someData: 1 },
      { label: 'Blue', value: 'blue', someData: 2 },
      { label: 'Purple', value: 'purple', someData: 3 },
      { label: 'Red', value: 'red', someData: 4 },
      { label: 'Orange', value: 'orange', someData: 5 },
      { label: 'Yellow', value: 'yellow', someData: 6 },
    ],
  },
  {
    options: [
      { label: 'Green', value: 'green', someData: 7 },
      { label: 'Forest', value: 'forest', someData: 8 },
      { label: 'Slate', value: 'slate', someData: 9 },
      { label: 'Silver', value: 'silver', someData: 10 },
    ],
  },
];

const filterColors = (inputValue) =>
  colourOptions.filter((colourOption) =>
    colourOption.label.toLowerCase().includes(inputValue.toLowerCase())
  );

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const loadOptions = (inputValue) =>
  delay(500).then(() => filterColors(inputValue));

class SelectStory extends React.Component {
  static displayName = 'SelectStory';
  render() {
    const isMulti = boolean('isMulti', false);
    const defaultOptions = boolean('defaultOptions', true)
      ? colourOptions
      : false;
    const showOptionGroupDivider = boolean('Show option group divider', false);
    const iconLeft = icons[select('iconLeft', ['', ...iconNames])];

    return (
      <React.Fragment>
        <Section>
          <Value
            key={`${isMulti}-${defaultOptions}`}
            defaultValue={isMulti ? [] : undefined}
            render={(value, onChange) => (
              <div>
                <AsyncSelectInput
                  horizontalConstraint={select(
                    'horizontalConstraint',
                    ['s', 'm', 'l', 'xl', 'scale'],
                    'scale'
                  )}
                  hasError={boolean('hasError', false)}
                  hasWarning={boolean('hasWarning', false)}
                  aria-label={text('aria-label', '')}
                  aria-labelledby={text('aria-labelledby', '')}
                  isAutofocussed={boolean('isAutofocussed', false)}
                  backspaceRemovesValue={boolean('backspaceRemovesValue', true)}
                  id={text('id', '')}
                  containerId={text('containerId', '')}
                  isClearable={boolean('isClearable', false)}
                  isDisabled={boolean('isDisabled', false)}
                  isReadOnly={boolean('isReadOnly', false)}
                  isMulti={isMulti}
                  isSearchable={boolean('isSearchable', true)}
                  maxMenuHeight={number('maxMenuHeight', 220)}
                  name={text('name', 'form-field-name')}
                  onBlur={action('onBlur')}
                  onChange={(event, info) => {
                    action('onChange')(event, info);
                    onChange(event.target.value);
                  }}
                  onFocus={action('onFocus')}
                  onInputChange={action('onInputChange')}
                  placeholder={text('placeholder', 'Select..')}
                  tabIndex={text('tabIndex', '0')}
                  tabSelectsValue={boolean('tabSelectsValue', true)}
                  value={value}
                  // Async props
                  defaultOptions={defaultOptions}
                  loadOptions={loadOptions}
                  cacheOptions={boolean('cacheOptions', false)}
                  showOptionGroupDivider={showOptionGroupDivider}
                  iconLeft={
                    iconLeft ? React.createElement(iconLeft) : undefined
                  }
                />
              </div>
            )}
          />
        </Section>
      </React.Fragment>
    );
  }
}

storiesOf('Components|Inputs/SelectInputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('AsyncSelectInput', () => <SelectStory />);
