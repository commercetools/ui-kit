import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Value } from 'react-value';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import PasswordInputReadme from './README.md';
import PasswordInput from './password-input';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(PasswordInputReadme))
  .add('PasswordInput', () => (
    <Section>
      <Value
        defaultValue=""
        render={(value, onChange) => (
          <PasswordInput
            id={text('id', '')}
            name={text('name', 'password')}
            value={text('value', value)}
            autoComplete={select('autoComplete', [
              '',
              'on',
              'off',
              'current-password',
              'new-password',
            ])}
            onChange={event => {
              action('onChange')(event);
              onChange(event.target.value);
            }}
            isPasswordVisible={boolean('isPasswordVisible', false)}
            autoFocus={boolean('autoFocus', false)}
            disabled={boolean('disabled', false)}
            readOnly={boolean('readOnly', false)}
            hasError={boolean('hasError', false)}
            hasWarning={boolean('hasWarning', false)}
            placeholder={text('placeholder', 'Password')}
            horizontalConstraint={select(
              'horizontalConstraint',
              ['s', 'm', 'l', 'xl', 'scale'],
              'm'
            )}
          />
        )}
      />
    </Section>
  ));
