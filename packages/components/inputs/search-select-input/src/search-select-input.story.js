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
import SearchSelectInput from './search-select-input';
import * as icons from '../../../icons';
import { SELECT_DROPDOWN_OPTION_TYPES } from './constants';

const iconNames = Object.keys(icons);

const colourOptions = [
  { label: 'Ocean', value: 'ocean', key: 'ocean', id: '1' },
  { label: 'Blue', value: 'blue', key: 'blue', id: '2' },
  { label: 'Purple', value: 'purple', key: 'purple', id: '3' },
  { label: 'Red', value: 'red', key: 'red', id: '4' },
  { label: 'Orange', value: 'orange', key: 'orange', id: '5' },
  { label: 'Yellow', value: 'yellow', key: 'yellow', id: '6' },
  { label: 'Green', value: 'green', key: 'green', id: '7' },
  { label: 'Forest', value: 'forest', key: 'forest', id: '8' },
  { label: 'Slate', value: 'slate', key: 'slate', id: '9' },
  { label: 'Silver', value: 'silver', key: 'silver', id: '10' },
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
    const iconLeft = icons[select('iconLeft', ['', ...iconNames])];
    const noOptionsMessage = text('No Option Message', 'No options');
    const loadingMessage = text('Loading options message', 'Loading...');
    const optionType = select(
      'Dropdown option style',
      Object.values(SELECT_DROPDOWN_OPTION_TYPES),
      SELECT_DROPDOWN_OPTION_TYPES.SINGLE_LINED_OPTION
    );
    return (
      <React.Fragment>
        <Section>
          <Value
            key={`${isMulti}`}
            defaultValue={isMulti ? [] : undefined}
            render={(value, onChange) => (
              <div>
                <SearchSelectInput
                  horizontalConstraint={select(
                    'horizontalConstraint',
                    ['s', 'm', 'l', 'xl', 'scale'],
                    'scale'
                  )}
                  optionType={optionType}
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
                  noOptionsMessage={() => noOptionsMessage}
                  loadingMessage={() => loadingMessage}
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
                  loadOptions={loadOptions}
                  cacheOptions={boolean('cacheOptions', false)}
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
  .add('SearchSelectInput', () => <SelectStory />);
