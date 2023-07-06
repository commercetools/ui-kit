import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Value } from 'react-value';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import Constraints from '../../../constraints';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import PasswordInput from './password-input';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('PasswordInput', () => (
    <Section>
      <Value
        defaultValue=""
        render={(value, onChange) => (
          <PasswordInput
            id={text('id', '')}
            name={text('name', 'password')}
            value={value}
            autoComplete={select('autoComplete', [
              '',
              'on',
              'off',
              'current-password',
              'new-password',
            ])}
            onChange={(event) => {
              action('onChange')(event);
              onChange(event.target.value);
            }}
            isPasswordVisible={boolean('isPasswordVisible', false)}
            isAutofocussed={boolean('isAutofocussed', false)}
            isDisabled={boolean('isDisabled', false)}
            isReadOnly={boolean('isReadOnly', false)}
            hasError={boolean('hasError', false)}
            hasWarning={boolean('hasWarning', false)}
            placeholder={text('placeholder', 'Password')}
            horizontalConstraint={select(
              'horizontalConstraint',
              Constraints.getAcceptedMaxPropValues(3),
              7
            )}
          />
        )}
      />
    </Section>
  ));
