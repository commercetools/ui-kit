import { createElement, Component } from 'react';
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
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import Section from '../../../../../docs/.storybook/decorators/section';
import NeighbouringStackingContext from '../../../../../docs/.storybook/decorators/neighbouring-stacking-context';
import { addMenuPortalProps } from '../../../../../docs/.storybook/utils';
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
  colourOptions.map((groupedOptionsList) => {
    const filteredOptions = groupedOptionsList.options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    return {
      options: filteredOptions,
    };
  });

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const loadOptions = (inputValue) =>
  delay(500).then(() => filterColors(inputValue));

class SelectStory extends Component {
  static displayName = 'SelectStory';
  render() {
    const isMulti = boolean('isMulti', false);
    const defaultOptions = boolean('defaultOptions', true)
      ? colourOptions
      : false;
    const showOptionGroupDivider = boolean('Show option group divider', false);
    const loadingMessage = text('loadingMessage', 'Loading results');
    const iconLeft = icons[select('iconLeft', ['', ...iconNames])];

    return (
      <>
        <Section>
          <Value
            key={`${isMulti}-${defaultOptions}`}
            defaultValue={isMulti ? [] : undefined}
            render={(value, onChange) => (
              <Spacings.Stack scale="m">
                <AsyncSelectInput
                  horizontalConstraint={select(
                    'horizontalConstraint',
                    Constraints.getAcceptedMaxPropValues(3),
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
                  closeMenuOnSelect={boolean('closeMenuOnSelect', true)}
                  name={text('name', 'form-field-name')}
                  onBlur={action('onBlur')}
                  onChange={(event, info) => {
                    action('onChange')(event, info);
                    onChange(event.target.value);
                  }}
                  loadingMessage={loadingMessage}
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
                  iconLeft={iconLeft ? createElement(iconLeft) : undefined}
                  {...addMenuPortalProps()}
                />
                <NeighbouringStackingContext />
              </Spacings.Stack>
            )}
          />
        </Section>
      </>
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
