import React from 'react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Value } from 'react-value';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import TextInputReadme from './README.md';
import TextInput from './text-input';

const darkTheme = {
  colorSurface: 'black',
  colorSolid: 'white',
  colorDarkAccent98: 'white',
  colorError: 'darkred',
  borderRadius6: '0',
};

const darkStyles = css`
  background-color: black;
`;

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(TextInputReadme))
  .add('TextInput', () => {
    const darkMode = boolean('dark mode (shows off custom theme)', false);
    return (
      <ThemeProvider theme={darkMode ? darkTheme : {}}>
        <div css={darkMode ? darkStyles : {}}>
          <Section>
            <Value
              defaultValue=""
              render={(value, onChange) => (
                <TextInput
                  id={text('id', '')}
                  name={text('name', '')}
                  value={text('value', value)}
                  onChange={event => {
                    action('onChange')(event);
                    onChange(event.target.value);
                  }}
                  autoFocus={boolean('autoFocus', false)}
                  disabled={boolean('disabled', false)}
                  readOnly={boolean('readOnly', false)}
                  hasError={boolean('hasError', false)}
                  hasWarning={boolean('hasWarning', false)}
                  placeholder={text('placeholder', 'Placeholder')}
                  horizontalConstraint={select(
                    'horizontalConstraint',
                    ['s', 'm', 'l', 'xl', 'scale'],
                    'm'
                  )}
                />
              )}
            />
          </Section>
        </div>
      </ThemeProvider>
    );
  });
