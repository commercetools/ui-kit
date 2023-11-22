import { Component, createElement } from 'react';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  text,
  select,
  number,
} from '@storybook/addon-knobs';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import { SELECT_DROPDOWN_OPTION_TYPES } from '@commercetools-uikit/select-utils';
import Section from '../../../../../docs/.storybook/decorators/section';
import NeighbouringStackingContext from '../../../../../docs/.storybook/decorators/neighbouring-stacking-context';
import { addMenuPortalProps } from '../../../../../docs/.storybook/utils';
import SearchSelectInput from './search-select-input';
import * as icons from '../../../icons';
import Readme from '../README.md';

const colourOptions = [
  {
    label:
      'This is label is very long and the reason that it is very long is to test how it is displayed in the dropdown or when it is select.',
    value: 'ocean',
    id: '1',
  },
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
  colourOptions.filter(
    (colourOption) =>
      colourOption.label === inputValue || colourOption.id === inputValue
  );

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const loadOptions = (inputValue) =>
  delay(500).then(() => filterColors(inputValue));

class SearchSelectInputStory extends Component {
  static displayName = 'SearchSelectInputStory';
  render() {
    const isMulti = boolean('isMulti', false);
    const menuIsOpen = boolean('menuIsOpen', false);
    const noOptionsMessage = text(
      'No options message',
      'No matches found for your search term'
    );
    const loadingMessage = text(
      'Loading options message',
      'Loading exact matches'
    );
    const optionType = select(
      'Dropdown option style',
      Object.values(SELECT_DROPDOWN_OPTION_TYPES),
      SELECT_DROPDOWN_OPTION_TYPES.SINGLE_PROPERTY
    );
    const iconNames = Object.keys(icons);
    const iconLeft = icons[select('iconLeft', ['', ...iconNames])];
    return (
      <>
        <Section>
          <Value
            key={`${isMulti}`}
            defaultValue={isMulti ? [] : undefined}
            render={(value, onChange) => (
              <Spacings.Stack scale="m">
                <SearchSelectInput
                  horizontalConstraint={select(
                    'horizontalConstraint',
                    Constraints.getAcceptedMaxPropValues(3),
                    'scale'
                  )}
                  optionType={optionType}
                  hasError={boolean('hasError', false)}
                  hasWarning={boolean('hasWarning', false)}
                  aria-label={text('aria-label', '')}
                  aria-labelledby={text('aria-labelledby', '')}
                  isAutofocussed={boolean('isAutofocussed', false)}
                  backspaceRemovesValue={boolean('backspaceRemovesValue', true)}
                  controlShouldRenderValue={boolean(
                    'controlShouldRenderValue',
                    true
                  )}
                  id={text('id', '')}
                  containerId={text('containerId', '')}
                  isClearable={boolean('isClearable', false)}
                  isDisabled={boolean('isDisabled', false)}
                  isReadOnly={boolean('isReadOnly', false)}
                  isMulti={isMulti}
                  noOptionsMessage={() => noOptionsMessage}
                  loadingMessage={loadingMessage}
                  menuIsOpen={menuIsOpen}
                  maxMenuHeight={number('maxMenuHeight', 220)}
                  closeMenuOnSelect={boolean('closeMenuOnSelect', true)}
                  name={text('name', 'form-field-name')}
                  onBlur={action('onBlur')}
                  onChange={(event, info) => {
                    action('onChange')(event, info);
                    onChange(event.target.value);
                  }}
                  onFocus={action('onFocus')}
                  onInputChange={action('onInputChange')}
                  placeholder={text('placeholder', 'Search by...')}
                  tabIndex={text('tabIndex', '0')}
                  tabSelectsValue={boolean('tabSelectsValue', true)}
                  value={value}
                  // Async props
                  loadOptions={loadOptions}
                  cacheOptions={boolean('cacheOptions', false)}
                  iconLeft={iconLeft ? createElement(iconLeft) : undefined}
                  {...addMenuPortalProps()}
                />
                <NeighbouringStackingContext />
                <div>
                  <p>
                    In this example, our `loadOptions` function uses the data
                    (given below) to perform an exact match. It is case
                    sensitive and it performs a search based on{' '}
                    <b>
                      <i>id</i>
                    </b>{' '}
                    and{' '}
                    <b>
                      <i>label</i>
                    </b>{' '}
                    fields with 2 seconds of delay
                  </p>
                  <b>Data used:</b>
                  <pre>{JSON.stringify(colourOptions, undefined, 2)}</pre>
                </div>
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
  .add('SearchSelectInput', () => <SearchSelectInputStory />);
