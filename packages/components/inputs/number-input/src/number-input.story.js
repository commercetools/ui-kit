import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import Constraints from '../../../constraints';
import { Value } from 'react-value';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import NumberInput from './number-input';

const getStepValue = (step) => {
  if (step.trim() === '') return undefined;
  if (step === 'any') return step;
  return parseFloat(step, 10);
};

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('NumberInput', () => {
    const min = text('min', '');
    const max = text('max', '');
    const step = text('step', '');

    return (
      <Section>
        <Value
          defaultValue={''}
          render={(value, onChange) => (
            <NumberInput
              id={text('id', '')}
              name={text('name', '')}
              value={value}
              onChange={(event, ...args) => {
                action('onChange')(event, ...args);
                onChange(event.target.value);
              }}
              onBlur={action('onBlur')}
              min={min.trim() === '' ? undefined : parseInt(min, 10)}
              max={max.trim() === '' ? undefined : parseInt(max, 10)}
              step={getStepValue(step)}
              isAutofocussed={boolean('isAutofocussed', false)}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              hasError={boolean('hasError', false)}
              hasWarning={boolean('hasWarning', false)}
              placeholder={text('placeholder', 'Placeholder')}
              horizontalConstraint={select(
                'horizontalConstraint',
                Constraints.getAcceptedMaxPropValues(),
                7
              )}
            />
          )}
        />
      </Section>
    );
  });
