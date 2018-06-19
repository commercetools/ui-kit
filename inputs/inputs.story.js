import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import { Value } from 'react-value';
import Section from '../.storybook/decorators/section';
import TextInputReadme from './text-input/README.md';
import NumberInputReadme from './number-input/README.md';
import MoneyInputReadme from './money-input/README.md';
import TextInput from './text-input';
import NumberInput from './number-input';
import MoneyInput from './money-input';

storiesOf('Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(TextInputReadme))
  .add('TextInput', () => (
    <Section>
      <TextInput
        name={text('name', '')}
        value={text('value', '')}
        onChange={action('onChange')}
        isAutofocussed={boolean('isAutofocussed', false)}
        isDisabled={boolean('isDisabled', false)}
        isReadOnly={boolean('isReadOnly', false)}
        hasError={boolean('hasError', false)}
        hasWarning={boolean('hasWarning', false)}
        placeholder={text('placeholder', 'Placeholder')}
        horizontalConstraint={select(
          'horizontalConstraint',
          ['xs', 's', 'm', 'l', 'xl', 'scale'],
          'm'
        )}
      />
    </Section>
  ))
  .addDecorator(withReadme(NumberInputReadme))
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
              name={text('name', '')}
              value={value}
              onChange={(event, ...args) => {
                action('onChange')(event, ...args);
                onChange(event.target.value);
              }}
              onBlur={action('onBlur')}
              min={min.trim() === '' ? undefined : parseInt(min, 10)}
              max={max.trim() === '' ? undefined : parseInt(max, 10)}
              step={step.trim() === '' ? undefined : parseFloat(step, 10)}
              isAutofocussed={boolean('isAutofocussed', false)}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              hasError={boolean('hasError', false)}
              hasWarning={boolean('hasWarning', false)}
              placeholder={text('placeholder', 'Placeholder')}
              horizontalConstraint={select(
                'horizontalConstraint',
                ['xs', 's', 'm', 'l', 'xl', 'scale'],
                'm'
              )}
            />
          )}
        />
      </Section>
    );
  })
  .addDecorator(withReadme(MoneyInputReadme))
  .add('MoneyInput', () => {
    const currencies = ['EUR', 'USD', 'AED', 'KWD'];
    const defaultCurrencyCode = select(
      'default value currencyCode',
      ['', ...currencies],
      ''
    );
    const defaultAmount = text('default value amount', '');
    return (
      <div>
        <Section>
          <IntlProvider locale="en">
            <Value
              key={`${defaultCurrencyCode}-${defaultAmount}`}
              defaultValue={MoneyInput.parseMoneyValue(undefined)}
              render={(value, onChange) => (
                <MoneyInput
                  value={value}
                  currencies={
                    boolean('dropdown', true) ? currencies : undefined
                  }
                  placeholder={text('placeholder', 'Placeholder')}
                  onBlur={(...args) => action('onBlur')(...args)}
                  isDisabled={boolean('isDisabled', false)}
                  onChange={(...args) => {
                    action('onChange')(...args);
                    onChange(...args);
                    // eslint-disable-next-line no-console
                    console.log(
                      'parsed',
                      MoneyInput.convertToMoneyValue(args[0])
                    );
                  }}
                  hasCurrencyError={boolean('hasCurrencyError', false)}
                  hasCurrencyWarning={boolean('hasCurrencyWarning', false)}
                  hasAmountError={boolean('hasAmountError', false)}
                  hasAmountWarning={boolean('hasAmountWarning', false)}
                  horizontalConstraint={select(
                    'horizontalConstraint',
                    ['s', 'm', 'l', 'xl', 'scale'],
                    'm'
                  )}
                />
              )}
            />
          </IntlProvider>
        </Section>
        <Section>
          <p>
            <i>
              Check the console to see the result of{' '}
              <code>MoneyInput.convertToMoneyValue</code>.
            </i>
          </p>
        </Section>
      </div>
    );
  });
