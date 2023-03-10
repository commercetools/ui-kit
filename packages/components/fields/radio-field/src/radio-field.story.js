import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
} from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import { Value } from 'react-value';
import RadioInput from '@commercetools-uikit/radio-input';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import * as icons from '../../../icons';
import RadioField from '.';

const radioField = 'Radio Field';
const radioOption1 = 'Option #1';
const radioOption2 = 'Option #2';
const radioOption3 = 'Option #3';

storiesOf('Components|Fields', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('RadioField', () => (
    <Section>
      <Value
        defaultValue={'apple'}
        render={(value, onChange) => {
          // hintIcon will only render when hint exists
          const iconNames = Object.keys(icons);
          const icon = select('hintIcon', ['', ...iconNames], '', radioField);
          const hintIcon = icon ? createElement(icons[icon]) : undefined;

          return (
            <RadioField
              id={text('id', 'fruits', radioField)}
              horizontalConstraint={select(
                'horizontalConstraint',
                Constraints.getAcceptedMaxPropValues(6),
                7,
                radioField
              )}
              errors={object(
                'errors',
                { missing: true, customError: true },
                radioField
              )}
              renderError={(key) => {
                switch (key) {
                  case 'customError':
                    return 'A custom error.';
                  default:
                    return null;
                }
              }}
              isRequired={boolean('isRequired', false, radioField)}
              touched={boolean('touched', false, radioField)}
              name={text('name', 'fruits', radioField)}
              value={value}
              onChange={(event) => {
                action('onChange')(event);
                onChange(event.target.value);
              }}
              onBlur={action('onBlur')}
              onFocus={action('onFocus')}
              isDisabled={boolean('isDisabled', false, radioField)}
              isReadOnly={boolean('isReadOnly', false, radioField)}
              title={text('title', 'Fruits', radioField)}
              hint={text('hint', 'Select an option', radioField)}
              description={text('description', '', radioField)}
              onInfoButtonClick={
                boolean('show info button', false, radioField)
                  ? action('onInfoButtonClick')
                  : undefined
              }
              hintIcon={hintIcon}
              badge={text('badge', '', radioField)}
              direction={select(
                'direction',
                ['stack', 'inline'],
                'stack',
                radioField
              )}
              directionProps={{
                scale: select(
                  'direction props (scale)',
                  ['xs', 's', 'm', 'l', 'xl'],
                  'm',
                  radioField
                ),
              }}
            >
              <RadioInput.Option
                value={text('value #1', 'apple', radioOption1)}
                isDisabled={boolean(
                  'isDisabled #1 (forced)',
                  false,
                  radioOption1
                )}
                isHovered={boolean('isHovered #1', false, radioOption1)}
                additionalContent={text('additionalContent', '', radioOption1)}
              >
                <div>{'🍎'}</div>
                <div>{text('label #1', 'Apple', radioOption1)}</div>
              </RadioInput.Option>
              <RadioInput.Option
                value={text('value #2', 'banana', radioOption2)}
                isDisabled={boolean(
                  'isDisabled #2 (forced)',
                  false,
                  radioOption2
                )}
                isHovered={boolean('isHovered #2', false, radioOption2)}
                additionalContent={text('additionalContent', '', radioOption2)}
              >
                <div>{'🍌'}</div>
                <div>{text('label #2', 'Banana', radioOption2)}</div>
              </RadioInput.Option>
              <RadioInput.Option
                value={text('value #3', 'pineapple', radioOption3)}
                isDisabled={boolean(
                  'isDisabled #3 (forced)',
                  false,
                  radioOption3
                )}
                isHovered={boolean('isHovered #3', false, radioOption3)}
                additionalContent={text('additionalContent', '', radioOption3)}
              >
                <div>{'🍍'}</div>
                <div>{text('label #3', 'Pineapple', radioOption3)}</div>
              </RadioInput.Option>
            </RadioField>
          );
        }}
      />
    </Section>
  ));
