import React from 'react';
import { IntlProvider } from 'react-intl';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import TextArea from './text-area';

storiesOf('Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('TextArea', () => {
    const defaultValue = text('default value', '');
    const isDefaultClosed = boolean('isDefaultClosed', false);
    return (
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
          <Value
            // remount component when defaults change
            key={`${defaultValue}-${isDefaultClosed}`}
            defaultValue={defaultValue}
            render={(value, onChange) => (
              <TextArea
                name={text('name', undefined)}
                id={text('id', undefined)}
                onBlur={action('onBlur')}
                onFocus={action('onFocus')}
                isAutofocussed={boolean('isAutofocussed', false)}
                isDefaultClosed={boolean('isDefaultClosed', false)}
                placeholder={text('placeholder')}
                horizontalConstraint={select(
                  'horizontalConstraint',
                  ['m', 'l', 'xl', 'scale'],
                  'scale'
                )}
                isDisabled={boolean('isDisabled', false)}
                isReadOnly={boolean('isReadOnly', false)}
                hasError={boolean('hasError', false)}
                hasWarning={boolean('hasWarning', false)}
                value={value}
                onChange={event => {
                  action('onChange')(event);
                  onChange(event.target.value);
                }}
              />
            )}
          />
        </IntlProvider>
      </Section>
    );
  });
