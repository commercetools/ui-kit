import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Value } from 'react-value';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
} from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import * as icons from '../../../icons';
import TextField from './text-field';

storiesOf('Components|Fields', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('TextField', () => (
    <Section>
      <Value
        defaultValue=""
        render={(value, onChange) => {
          const name = text('name', '');
          const hint = text('hint', 'Enter your username');

          // hintIcon will only render when hint exists
          const iconNames = Object.keys(icons);
          const icon = select('hintIcon', ['', ...iconNames], '');
          const hintIcon = icon ? createElement(icons[icon]) : undefined;
          return (
            <TextField
              id={name.trim() === '' ? undefined : name}
              horizontalConstraint={select(
                'horizontalConstraint',
                Constraints.getAcceptedMaxPropValues(3),
                7
              )}
              errors={object('errors', { missing: true, customError: true })}
              warnings={object('warnings', {
                customWarning: true,
              })}
              renderError={(key) => {
                switch (key) {
                  case 'customError':
                    return 'A custom error.';
                  default:
                    return null;
                }
              }}
              renderWarning={(key) => {
                switch (key) {
                  case 'customWarning':
                    return 'A custom warning.';
                  default:
                    return null;
                }
              }}
              isRequired={boolean('isRequired', false)}
              touched={boolean('touched', false)}
              name={text('name', '')}
              value={value}
              onChange={(event) => {
                action('onChange')(event);
                onChange(event.target.value);
              }}
              onBlur={action('onBlur')}
              onFocus={action('onFocus')}
              isAutofocussed={boolean('isAutofocussed', false)}
              isCondensed={boolean('isCondensed', false)}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              placeholder={text('placeholder', 'Placeholder')}
              title={text('title', 'Username')}
              hint={hint}
              description={text('description', '')}
              onInfoButtonClick={
                boolean('show info button', false)
                  ? action('onInfoButtonClick')
                  : undefined
              }
              hintIcon={hintIcon}
              badge={text('badge', '')}
            />
          );
        }}
      />
    </Section>
  ));
