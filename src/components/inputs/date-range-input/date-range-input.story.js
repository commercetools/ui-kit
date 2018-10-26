import React from 'react';
import { storiesOf } from '@storybook/react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import DateRangeInput from './date-range-input';
import * as messages from '../../../../i18n';

addLocaleData(en);
addLocaleData(de);
addLocaleData(es);
const locales = Object.keys(messages);

const getMessages = locale => messages[locale];

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('DateRangeInput', () => {
    const locale = select('locale', locales, locales[0]);
    return (
      <Section>
        <IntlProvider locale={locale} messages={getMessages(locale)}>
          <Value
            defaultValue={[]}
            render={(value, onChange) => (
              <div>
                <DateRangeInput
                  value={value}
                  onChange={date => {
                    action('onChange')(date);
                    onChange(date);
                  }}
                  isClearable={boolean('isClearable', true)}
                  horizontalConstraint={select(
                    'horizontalConstraint',
                    ['xs', 's', 'm', 'l', 'xl', 'scale'],
                    'm'
                  )}
                  isDisabled={boolean('isDisabled', false)}
                  hasError={boolean('hasError', false)}
                  hasWarning={boolean('hasWarning', false)}
                />
                {value && (
                  <React.Fragment>
                    <pre>From: {value[0]}</pre>
                    <pre>To: {value[1]}</pre>
                  </React.Fragment>
                )}
              </div>
            )}
          />
        </IntlProvider>
      </Section>
    );
  });
