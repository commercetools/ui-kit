import React from 'react';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
} from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import ErrorMessage from '../../messages/error-message';
import WarningMessage from '../../messages/warning-message';
import LocalizedMoneyInputReadme from './README.md';
import LocalizedMoneyInput from './localized-money-input';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(LocalizedMoneyInputReadme))
  .add('LocalizedMoneyInput', () => {
    const defaultExpandCurrencies = boolean('defaultExpandCurrencies', false);

    const errors = object('errors', { EUR: '', USD: '', EGP: '' });
    const warnings = object('warnings', { EUR: '', USD: '', EGP: '' });
    // We need to force the component to rerender in case a default value
    // is changed. Otherwise the knob would have no effect.
    // We do this by changing the key.
    const key = `key-${defaultExpandCurrencies}`;
    return (
      <Section>
        <Value
          defaultValue={{ EUR: '', USD: '', EGP: '' }}
          render={(value, onChange) => (
            <LocalizedMoneyInput
              key={key}
              id={text('id', undefined)}
              name={text('name', 'productName')}
              value={object('value', value)}
              onChange={event => {
                action('onChange')(event);
                onChange({
                  ...value,
                  [event.target.currency]: event.target.value,
                });
              }}
              selectedCurrency={select(
                'selectedCurrency',
                ['EUR', 'USD', 'EGP'],
                'EUR'
              )}
              onBlur={action('onBlur')}
              onFocus={action('onFocus')}
              hideCurrencyExpansionControls={boolean(
                'hideCurrencyExpansionControls',
                false
              )}
              defaultExpandCurrencies={
                // we need to set undefined instead of false to avoid prop-type
                // warnings in case hideCurrencyExpansionControls is true
                defaultExpandCurrencies || undefined
              }
              isDisabled={boolean('isDisabled', false)}
              placeholder={object('placeholder', { EUR: '', USD: '' })}
              horizontalConstraint={select(
                'horizontalConstraint',
                ['xs', 's', 'm', 'l', 'xl', 'scale'],
                'm'
              )}
              hasError={boolean('hasError', false)}
              hasWarning={boolean('hasWarning', false)}
              errors={
                Object.values(errors).some(error => error.length > 0)
                  ? Object.entries(errors).reduce((acc, [currency, error]) => {
                      if (error.length === 0) return acc;
                      acc[currency] = <ErrorMessage>{error}</ErrorMessage>;
                      return acc;
                    }, {})
                  : undefined
              }
              warnings={
                Object.values(warnings).some(warning => warning.length > 0)
                  ? Object.entries(warnings).reduce(
                      (acc, [currency, warning]) => {
                        if (warning.length === 0) return acc;
                        acc[currency] = (
                          <WarningMessage>{warning}</WarningMessage>
                        );
                        return acc;
                      },
                      {}
                    )
                  : undefined
              }
              data-test="foo"
            />
          )}
        />
      </Section>
    );
  });
