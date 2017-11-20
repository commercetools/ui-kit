import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs } from '@storybook/addon-knobs';
import { IntlProvider } from 'react-intl';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Section from '../.storybook/decorators/section';
import Readme from './README.md';
import TimeRangePicker from './time-range-picker';

const store = createStore(() => ({ globalAppState: { locale: 'en' } }));

storiesOf('Dates', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('TimeRangePicker', () => (
    <Section>
      <Provider store={store}>
        <IntlProvider
          locale="en"
          messages={{
            en: {
              'UIKit.TimeRangePicker.from': 'From',
              'UIKit.TimeRangePicker.to': 'To',
            },
          }}
        >
          <TimeRangePicker value={{}} onChange={action} />
        </IntlProvider>
      </Provider>
    </Section>
  ));
