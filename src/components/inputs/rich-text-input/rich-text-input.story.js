import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import Spacings from '../../spacings';
import Section from '../../../../.storybook/decorators/section';
import RichTextInput from './rich-text-input';
import Readme from './README.md';
import TextInput from '../text-input';

// Create our initial value...

const initialValue = RichTextInput.deserialize('');
storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('RichTextInput', () => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = React.useCallback(event => setValue(event.target.value), [
      setValue,
    ]);

    const [textValue, setTextValue] = React.useState('');

    const onBlur = React.useCallback(action('onBlur'), []);
    const onFocus = React.useCallback(action('onFocus'), []);

    return (
      <Section>
        <Spacings.Stack scale="l">
          <RichTextInput
            id={text('id', 'test-id')}
            name={text('name', 'test-name')}
            onChange={onChange}
            defaultExpandMultilineText={boolean(
              'defaultExpandMultilineText',
              false
            )}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={text('placeholder', 'Placeholder')}
            hasError={boolean('hasError', false)}
            hasWarning={boolean('hasWarning', false)}
            isDisabled={boolean('isDisabled', false)}
            isReadOnly={boolean('isReadOnly', false)}
          />
          <TextInput
            id="text-input"
            name="text-input"
            onChange={evt => setTextValue(evt.target.value)}
            value={textValue}
          />
        </Spacings.Stack>
      </Section>
    );
  });
