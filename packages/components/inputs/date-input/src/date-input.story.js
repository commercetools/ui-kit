import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import { action } from '@storybook/addon-actions';
import { getExampleDateStrings } from '@commercetools-uikit/calendar-utils';
import { Value } from 'react-value';
import Readme from '../README.md';
import DateInput from './date-input';
import Section from '../../../../../docs/.storybook/decorators/section';

const exampleDates = getExampleDateStrings();

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('DateInput', () => (
    <Section>
      <Value
        defaultValue={exampleDates.preselectedDate}
        render={(value, onChange) => {
          const placeholder = text('placeholder', '');
          return (
            <DateInput
              value={value}
              onBlur={action('onBlur')}
              onFocus={action('onFocus')}
              onChange={(event) => {
                action('onChange')(event);
                onChange(event.target.value);
              }}
              horizontalConstraint={select(
                'horizontalConstraint',
                Constraints.getAcceptedMaxPropValues(6),
                10
              )}
              id={text('id', '')}
              name={text('name', '')}
              placeholder={placeholder === '' ? undefined : placeholder}
              isCondensed={boolean('isCondensed', false)}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              hasError={boolean('hasError', false)}
              hasWarning={boolean('hasWarning', false)}
              minValue={text('minValue', exampleDates.minDate)}
              maxValue={text('maxValue', exampleDates.maxDate)}
            />
          );
        }}
      />
    </Section>
  ));
