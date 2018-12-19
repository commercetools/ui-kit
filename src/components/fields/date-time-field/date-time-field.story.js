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
import DateTimeFieldReadme from './README.md';
import * as icons from '../../icons';
import DateTimeField from './date-time-field';

storiesOf('Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(DateTimeFieldReadme))
  .add('DateTimeField', () => (
    <Section>
      <Value
        defaultValue=""
        render={(value, onChange) => {
          const name = text('name', '');
          const hint = text('hint', 'Select the date of publication');
          const placeholder = text('placeholder', 'Placeholder');

          // hintIcon will only render when hint exists
          const iconNames = Object.keys(icons);
          const icon = select('hintIcon', ['', ...iconNames], '');
          const hintIcon = icon ? React.createElement(icons[icon]) : undefined;
          return (
            <DateTimeField
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
              timeZone={select(
                'timeZone',
                [
                  'UTC',
                  'America/Los_Angeles',
                  'America/New_York',
                  'Asia/Tokyo',
                  'Europe/Amsterdam',
                ],
                'UTC'
              )}
              name={text('name', '')}
              value={text('value', value)}
              onChange={event => {
                action('onChange')(event);
                onChange(event.target.value);
              }}
              onBlur={action('onBlur')}
              onFocus={action('onFocus')}
              isDisabled={boolean('isDisabled', false)}
              placeholder={placeholder === '' ? undefined : placeholder}
              title={text('title', 'Release Date')}
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
