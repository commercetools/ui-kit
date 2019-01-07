import React from 'react';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import MultilineTextInput from './multiline-text-input';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('MultilineTextInput', () => {
    const defaultValue = text('default value', '');
    const defaultExpandMultilineText = boolean(
      'defaultExpandMultilineText',
      false
    );
    return (
      <Section>
        <Value
          // remount component when defaults change
          key={`${defaultValue}-${defaultExpandMultilineText}`}
          defaultValue={defaultValue}
          render={(value, onChange) => (
            <MultilineTextInput
              name={text('name', undefined)}
              id={text('id', undefined)}
              onBlur={action('onBlur')}
              onFocus={action('onFocus')}
              isAutofocussed={boolean('isAutofocussed', false)}
              defaultExpandMultilineText={defaultExpandMultilineText}
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
      </Section>
    );
  });
