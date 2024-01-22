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
import MultilineTextField from './multiline-text-field';

storiesOf('Components|Fields', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('MultilineTextField', () => (
    <Section>
      <Value
        defaultValue=""
        render={(value, onChange) => {
          const name = text('name', '');
          const hint = text('hint', 'Enter a description');
          const defaultExpandMultilineText = boolean(
            'defaultExpandMultilineText',
            false
          );

          // hintIcon will only render when hint exists
          const iconNames = Object.keys(icons);
          const icon = select('hintIcon', ['', ...iconNames], '');
          const hintIcon = icon ? createElement(icons[icon]) : undefined;
          return (
            <MultilineTextField
              key={
                defaultExpandMultilineText
                  ? 'default-expanded'
                  : 'not-default-expanded'
              }
              id={name.trim() === '' ? undefined : name}
              horizontalConstraint={select(
                'horizontalConstraint',
                Constraints.getAcceptedMaxPropValues(6),
                7
              )}
              warnings={object('warnings', {
                defaultWarning: true,
                customWarning: true,
              })}
              errors={object('errors', { missing: true, customError: true })}
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
              renderDefaultWarning={(key) => {
                switch (key) {
                  case 'defaultWarning':
                    return 'A default warning.';
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
              isDisabled={boolean('isDisabled', false)}
              defaultExpandMultilineText={defaultExpandMultilineText}
              isReadOnly={boolean('isReadOnly', false)}
              placeholder={text('placeholder', 'Placeholder')}
              title={text('title', 'Description')}
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
