import React from 'react';
import { Global, css } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import { Value } from 'slate';
import { Value as ReactValue } from 'react-value';
import withReadme from 'storybook-readme/with-readme';
import Spacings from '../../spacings';
import Section from '../../../../.storybook/decorators/section';
import RichTextInput from './rich-text-input';
import Readme from './README.md';
import jsonValue from './value';
import TextInput from '../text-input';
// Create our initial value...
const initialValue = Value.fromJSON(jsonValue);

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('RichTextInput', () => (
    <Section>
      <Global
        styles={css`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin: 0;
          }
          p {
            margin: 0;
          }
        `}
      />
      <Spacings.Stack scale="l">
        <ReactValue
          defaultValue={initialValue}
          render={(value, onChange) => {
            return (
              <RichTextInput
                id={text('id', '')}
                name={text('name', '')}
                onChange={event => {
                  // console.log(RichTextInput.serializeHtml(newValue));
                  onChange(event.target.value);
                }}
                value={value}
                placeholder={text('placeholder', 'Placeholder')}
                hasError={boolean('hasError', false)}
                hasWarning={boolean('hasWarning', false)}
                isDisabled={boolean('isDisabled', false)}
                isReadOnly={boolean('isReadOnly', false)}
              />
            );
          }}
        />

        <ReactValue
          defaultValue={''}
          render={(value, onChange) => {
            return (
              <TextInput
                onChange={evt => onChange(evt.target.value)}
                value={value}
              />
            );
          }}
        />
      </Spacings.Stack>
    </Section>
  ));
