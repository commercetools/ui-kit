import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Value } from 'react-value';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
} from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import MoneyFieldReadme from './README.md';
import * as icons from '../../icons';
import MoneyField from './money-field';

storiesOf('Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(MoneyFieldReadme))
  .add('MoneyField', () => {
    const currencies = ['EUR', 'USD', 'AED', 'KWD'];
    const defaultCurrencyCode = select(
      'default value currencyCode',
      ['', ...currencies],
      ''
    );
    const defaultAmount = text('default value amount', '');
    const name = text('name', '') || 'default-name';
    const hint = text('hint', 'How much is the fish?');

    // hintIcon will only render when hint exists
    const iconNames = Object.keys(icons);
    const icon = select('hintIcon', ['', ...iconNames], '');
    const hintIcon = icon ? React.createElement(icons[icon]) : undefined;
    return (
      <Section>
        <Value
          key={`${defaultCurrencyCode}-${defaultAmount}`}
          defaultValue={{
            amount: defaultAmount,
            currencyCode: defaultCurrencyCode,
          }}
          render={(value, onChange) => (
            <MoneyField
              // MoneyField
              id={name.trim() === '' ? undefined : name}
              horizontalConstraint={select(
                'horizontalConstraint',
                ['xs', 's', 'm', 'l', 'xl', 'scale'],
                'm'
              )}
              errors={object('errors', { missing: true, customError: true })}
              renderError={key => {
                switch (key) {
                  case 'customError':
                    return 'A custom error.';
                  default:
                    return null;
                }
              }}
              isRequired={boolean('isRequired', false)}
              touched={
                boolean('touched', false)
                  ? { amount: true, currencyCode: true }
                  : { amount: false, currencyCode: false }
              }
              // MoneyInput
              name={name}
              value={value}
              currencies={boolean('dropdown', true) ? currencies : undefined}
              placeholder={text('placeholder', 'Placeholder')}
              onBlur={(...args) => action('onBlur')(...args)}
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
                  MoneyField.convertToMoneyValue(nextMoney)
                );
              }}
              hasCurrencyError={boolean('hasCurrencyError', false)}
              hasCurrencyWarning={boolean('hasCurrencyWarning', false)}
              hasAmountError={boolean('hasAmountError', false)}
              hasAmountWarning={boolean('hasAmountWarning', false)}
              // LabelField
              title={text('title', 'Username')}
              hint={hint}
              description={text('description', '')}
              onInfoButtonClick={
                boolean('show info button', false)
                  ? action('onInfoButtonClick')
                  : undefined
              }
              hintIcon={hintIcon}
              badge={text('badge', '')}
            />
          )}
        />
      </Section>
    );
  });
