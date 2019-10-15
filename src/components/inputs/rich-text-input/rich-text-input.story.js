/* eslint-disable react/prop-types, react/display-name */
import React from 'react';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import Spacings from '../../spacings';
import Section from '../../../../.storybook/decorators/section';
import RichTextInput from './rich-text-input';
import TextInput from '../text-input';
import Readme from './README.md';

// Create our initial value...

const initialValue = '<h1>H1 heading</h1>';

const Input = props => {
  return (
    <Value
      defaultValue={initialValue}
      render={(value, onChange) => (
        <RichTextInput
          id={props.id}
          name={props.name}
          key={`rich-text-input-${props.defaultExpandMultilineText}`}
          onChange={event => {
            onChange(event.target.value);
          }}
          value={props.showBlah ? initialValue : value}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          defaultExpandMultilineText={props.defaultExpandMultilineText}
          placeholder={props.placeholder}
          onClickExpand={props.onClickExpand}
          showExpandIcon={props.showExpandIcon}
          hasError={props.hasError}
          hasWarning={props.hasWarning}
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
        />
      )}
    />
  );
};

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('RichTextInput', () => {
    const onClickExpand = React.useCallback(() => {
      // eslint-disable-next-line no-alert
      alert('Expand');
    }, []);

    const onBlur = React.useCallback(action('onBlur'), []);
    const onFocus = React.useCallback(action('onFocus'), []);

    return (
      <Section>
        <Spacings.Stack scale="l">
          <Value
            defaultValue={''}
            render={(value, onChange) => (
              <TextInput
                id="text-input"
                name="text-input"
                value={value}
                onChange={event => onChange(event.target.value)}
              />
            )}
          />
          <Input
            id={text('id', 'test-id')}
            name={text('name', 'test-name')}
            onBlur={onBlur}
            onFocus={onFocus}
            defaultExpandMultilineText={boolean(
              'defaultExpandMultilineText',
              true
            )}
            showBlah={boolean('yes', false)}
            placeholder={text('placeholder', 'Placeholder')}
            showExpandIcon={boolean('showExpandIcon', false)}
            onClickExpand={onClickExpand}
            hasError={boolean('hasError', false)}
            hasWarning={boolean('hasWarning', false)}
            isDisabled={boolean('isDisabled', false)}
            isReadOnly={boolean('isReadOnly', false)}
          />
        </Spacings.Stack>
      </Section>
    );
  });
