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
import Constraints from '@commercetools-uikit/constraints';
import { ErrorMessage, WarningMessage } from '@commercetools-uikit/messages';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import LocalizedMoneyInput from './localized-money-input';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
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
          defaultValue={{
            EUR: { currencyCode: 'EUR', amount: '' },
            USD: { currencyCode: 'USD', amount: '' },
            EGP: { currencyCode: 'EGP', amount: '' },
          }}
          render={(value, onChange) => (
            <LocalizedMoneyInput
              key={key}
              id={text('id', undefined)}
              name={text('name', 'productName')}
              value={value}
              hasHighPrecisionBadge={boolean('hasHighPrecisionBadge', false)}
              onChange={(event) => {
                action('onChange')(event);
                onChange({
                  ...value,
                  [event.target.currency]: {
                    currencyCode: event.target.currency,
                    amount: event.target.value,
                  },
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
              isReadOnly={boolean('isReadOnly', false)}
              placeholder={object('placeholder', { EUR: '', USD: '' })}
              horizontalConstraint={select(
                'horizontalConstraint',
                Constraints.getAcceptedMaxPropValues(3),
                7
              )}
              hasError={boolean('hasError', false)}
              hasWarning={boolean('hasWarning', false)}
              errors={
                Object.values(errors).some((error) => error.length > 0)
                  ? Object.entries(errors).reduce((acc, [currency, error]) => {
                      if (error.length === 0) return acc;
                      acc[currency] = <ErrorMessage>{error}</ErrorMessage>;
                      return acc;
                    }, {})
                  : undefined
              }
              warnings={
                Object.values(warnings).some((warning) => warning.length > 0)
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
