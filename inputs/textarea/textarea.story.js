import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import { IntlProvider } from 'react-intl';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import TextArea from './textarea';

const store = createStore(() => ({ globalAppState: { locale: 'en' } }));

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('TextArea', () => (
    <Section>
      <Provider store={store}>
        <IntlProvider
          locale="en"
          messages={{
            en: {
              'UIKit.TextArea.expand': 'Expand',
              'UIKit.TextArea.collapse': 'Collapse',
            },
          }}
        >
          <TextArea
            isDisabled={boolean('isDisabled', false)}
            isReadOnly={boolean('isReadOnly', false)}
            hasError={boolean('hasError', false)}
            hasWarning={boolean('hasWarning', false)}
          />
        </IntlProvider>
      </Provider>
    </Section>
  ));
