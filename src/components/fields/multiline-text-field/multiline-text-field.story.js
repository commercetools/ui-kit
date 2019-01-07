import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Value } from 'react-value';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
} from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import MultilineTextFieldReadme from './README.md';
import * as icons from '../../icons';
import MultilineTextField from './multiline-text-field';

storiesOf('Components|Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(MultilineTextFieldReadme))
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
          const hintIcon = icon ? React.createElement(icons[icon]) : undefined;
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
                ['xs', 's', 'm', 'l', 'xl', 'scale'],
                'm'
              )}
              errors={object('errors', { missing: true, customError: true })}
              renderError={key => {
                switch (key) {
                  case 'customError':
                    return 'A custom error.';
                  default:
                    return null;
                }
              }}
              isRequired={boolean('isRequired', false)}
              touched={boolean('touched', false)}
              name={text('name', '')}
              value={text('value', value)}
              onChange={event => {
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
