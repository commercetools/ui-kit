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
// import Readme from '../README.md';
import SearchSelectInput from './search-select-input';
import * as icons from '../../../icons';
import {
  FullDetailedSearchSelectInputOption,
  BriefDetailedSearchSelectInputOption,
} from './search-select-input-option';

const iconNames = Object.keys(icons);

const colourOptions = [
  { label: 'Ocean', value: 'ocean', key: 'ocean' },
  { label: 'Blue', value: 'blue', key: 'blue' },
  { label: 'Purple', value: 'purple', key: 'purple' },
  { label: 'Red', value: 'red', key: 'red' },
  { label: 'Orange', value: 'orange', key: 'orange' },
  { label: 'Yellow', value: 'yellow', key: 'yellow' },
  { label: 'Green', value: 'green', key: 'green' },
  { label: 'Forest', value: 'forest', key: 'forest' },
  { label: 'Slate', value: 'slate', key: 'slate' },
  { label: 'Silver', value: 'silver', key: 'silver' },
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
    const optionComponent = select(
      'Dropdown option style',
      ['single-option', 'brief-detailed-option', 'full-detailed-option'],
      'single-option'
    );
    const dropdownOptionComponent = () => {
      switch (optionComponent) {
        case 'full-detailed-option':
          return FullDetailedSearchSelectInputOption;
        case 'brief-detailed-option':
          return BriefDetailedSearchSelectInputOption;
        default:
          return null;
      }
    };
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
                  components={{
                    ...(dropdownOptionComponent() && {
                      Option: dropdownOptionComponent(),
                    }),
                  }}
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
                  noOptionsMessage={() =>
                    text('No Option Message (non-empty input)', 'No options')
                  }
                  initialSuggestionMessage={() =>
                    text(
                      'Initial suggestion message (empty input)',
                      'Please something to load options'
                    )
                  }
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
