import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import TextArea from './text-area';

storiesOf('Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('TextArea', () => (
    <Section>
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
          value={text('value', '')}
          onChange={action('onChange')}
        />
      </IntlProvider>
    </Section>
  ));
