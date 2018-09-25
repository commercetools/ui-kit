import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import { Value } from 'react-value';
import Section from '../../../../.storybook/decorators/section';
import MoneyInputReadme from './README.md';
import MoneyInput from './money-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(MoneyInputReadme))
  .add('MoneyInput', () => {
    const currencies = ['EUR', 'USD', 'AED', 'KWD'];
    const defaultCurrencyCode = select(
      'default value currencyCode',
      ['', ...currencies],
      ''
    );
    const defaultAmount = text('default value amount', '');
    const name = text('name', '') || 'default-name';
    return (
      <React.Fragment>
        <Section>
          <Value
            key={`${defaultCurrencyCode}-${defaultAmount}`}
            defaultValue={{
              amount: defaultAmount,
              currencyCode: defaultCurrencyCode,
            }}
            render={(value, onChange) => (
              <MoneyInput
                id={text('id', '')}
                name={name}
                value={value}
                currencies={boolean('dropdown', true) ? currencies : undefined}
                placeholder={text('placeholder', 'Placeholder')}
                onBlur={action('onBlur')}
                isDisabled={boolean('isDisabled', false)}
                onChange={event => {
                  action('onChange')(event);

                  const nextMoney = do {
                    if (event.target.name.endsWith('.amount')) {
                      ({ ...value, amount: event.target.value });
                    } else if (event.target.name.endsWith('.currencyCode')) {
                      ({ ...value, currencyCode: event.target.value });
                    }
                  };

                  onChange(nextMoney);

                  // eslint-disable-next-line no-console
                  console.log(
                    'parsed',
                    MoneyInput.convertToMoneyValue(nextMoney)
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
        </Section>
        <Section>
          <p>
            <i>
              Check the console to see the result of{' '}
              <code>MoneyInput.convertToMoneyValue</code>.
            </i>
          </p>
        </Section>
      </React.Fragment>
    );
  });
