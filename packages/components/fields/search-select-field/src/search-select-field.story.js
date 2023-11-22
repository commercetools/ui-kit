import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Value } from 'react-value';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
  number,
} from '@storybook/addon-knobs';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import { SELECT_DROPDOWN_OPTION_TYPES } from '../../../inputs/select-utils';
import Section from '../../../../../docs/.storybook/decorators/section';
import NeighbouringStackingContext from '../../../../../docs/.storybook/decorators/neighbouring-stacking-context';
import { addMenuPortalProps } from '../../../../../docs/.storybook/utils';
import Readme from '../README.md';
import * as icons from '../../../icons';
import SearchSelectField from './search-select-field';

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

storiesOf('Components|Fields/SelectFields', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('SearchSelectField', () => {
    const isMulti = boolean('isMulti', false);
    const hint = text('hint', 'Select color that matches the background');
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
    // hintIcon will only render when hint exists
    const iconNames = Object.keys(icons);
    const icon = select('hintIcon', ['', ...iconNames], '');
    const iconLeft = icons[select('iconLeft', ['', ...iconNames])];
    const hintIcon = icon ? createElement(icons[icon]) : undefined;
    const name = text('name', 'color');
    const id = text('id', '');

    return (
      <Section>
        <Value
          key={isMulti}
          defaultValue={isMulti ? [] : undefined}
          render={(value, onChange) => (
            <Spacings.Stack scale="m">
              <SearchSelectField
                horizontalConstraint={select(
                  'horizontalConstraint',
                  Constraints.getAcceptedMaxPropValues(3),
                  7
                )}
                errors={object('errors', { missing: true, customError: true })}
                renderError={(key) => {
                  switch (key) {
                    case 'customError':
                      return 'A custom error.';
                    default:
                      return null;
                  }
                }}
                isRequired={boolean('isRequired', false)}
                touched={boolean('touched', false)}
                aria-label={text('aria-label', '')}
                aria-labelledby={text('aria-labelledby', '')}
                backspaceRemovesValue={boolean('backspaceRemovesValue', true)}
                containerId={text('containerId', '')}
                controlShouldRenderValue={boolean(
                  'controlShouldRenderValue',
                  true
                )}
                id={id || undefined}
                name={name}
                value={value}
                optionType={optionType}
                onChange={(event) => {
                  action('onChange')(event);
                  onChange(event.target.value);
                }}
                onBlur={action('onBlur')}
                onFocus={action('onFocus')}
                onInputChange={action('onInputChange')}
                isAutofocussed={boolean('isAutofocussed', false)}
                isDisabled={boolean('isDisabled', false)}
                isReadOnly={boolean('isReadOnly', false)}
                isMulti={isMulti}
                hasWarning={boolean('hasWarning', false)}
                placeholder={text('placeholder', 'Search by...')}
                loadingMessage={loadingMessage}
                noOptionsMessage={() => noOptionsMessage}
                title={text('title', 'Select a color')}
                maxMenuHeight={number('maxMenuHeight', 220)}
                isSearchable={boolean('isSearchable', true)}
                isClearable={boolean('isClearable', false)}
                tabIndex={text('tabIndex', '0')}
                tabSelectsValue={boolean('tabSelectsValue', true)}
                // Async props
                loadOptions={loadOptions}
                cacheOptions={boolean('cacheOptions', false)}
                // FieldLabel
                hint={hint}
                description={text('description', '')}
                onInfoButtonClick={
                  boolean('show info button', false)
                    ? action('onInfoButtonClick')
                    : undefined
                }
                hintIcon={hintIcon}
                badge={text('badge', '')}
                iconLeft={iconLeft ? createElement(iconLeft) : undefined}
                {...addMenuPortalProps()}
              />
              <NeighbouringStackingContext />
              <div>
                <p>
                  In this example, our `loadOptions` function uses the data
                  (given below) to perform an exact match. It is case sensitive
                  and it performs a search based on{' '}
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
    );
  });
