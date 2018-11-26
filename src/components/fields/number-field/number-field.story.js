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
  number,
} from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import NumberFieldReadme from './README.md';
import Icons from '../../icons';
import NumberField from './number-field';

storiesOf('Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(NumberFieldReadme))
  .add('NumberField', () => (
    <Section>
      <Value
        defaultValue=""
        render={(value, onChange) => {
          const name = text('name', '').trim();
          const hint = text('hint', 'Enter your age');

          // hintIcon will only render when hint exists
          const iconNames = Object.keys(Icons);
          const icon = select('hintIcon', ['', ...iconNames], '');
          const hintIcon = icon ? React.createElement(Icons[icon]) : undefined;
          return (
            <NumberField
              id={name === '' ? undefined : name}
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
              value={value}
              onChange={event => {
                action('onChange')(event);
                onChange(event.target.value);
              }}
              onBlur={action('onBlur')}
              onFocus={action('onFocus')}
              isAutofocussed={boolean('isAutofocussed', false)}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              placeholder={text('placeholder', 'Placeholder')}
              title={text('title', 'Age')}
              min={number('min')}
              max={number('max')}
              step={number('step')}
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
