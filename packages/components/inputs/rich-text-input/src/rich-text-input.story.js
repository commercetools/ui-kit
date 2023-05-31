/* eslint-disable react/prop-types, react/display-name */

import { useState, useCallback, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import Spacings from '@commercetools-uikit/spacings';
import PrimaryButton from '@commercetools-uikit/primary-button';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import Text from '@commercetools-uikit/text';
import Section from '../../../../../docs/.storybook/decorators/section';
import RichTextInput from './rich-text-input';
import Readme from '../README.md';

// Create our initial value...

const initialValue = '<h1>H1 <u>heading</u></h1>';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('RichTextInput', () => {
    const onClickExpand = useCallback(() => {
      // eslint-disable-next-line no-alert
      alert('Expand');
    }, []);

    const onBlur = useCallback(action('onBlur'), []);
    const onFocus = useCallback(action('onFocus'), []);
    const ref = useRef(null);
    const [value, setValue] = useState(initialValue);
    const [resetValue, setResetValue] = useState(initialValue);
    const onChange = useCallback(
      (event) => {
        setValue(event.target.value);
      },
      [setValue]
    );
    const onResetValueChange = useCallback(
      (event) => {
        setResetValue(event.target.value);
      },
      [setResetValue]
    );
    const handleReset = () => {
      ref.current?.resetValue(resetValue);
    };

    return (
      <Section>
        <Spacings.Stack scale="l">
          <CollapsiblePanel
            header="Set initial value"
            horizontalConstraint="scale"
            isDefaultClosed
          >
            <Constraints.Horizontal max="scale">
              <Spacings.Stack scale="m">
                <textarea
                  defaultValue={resetValue}
                  onChange={onResetValueChange}
                  rows={4}
                />
                <Constraints.Horizontal max="auto">
                  <PrimaryButton
                    label="Reset"
                    onClick={handleReset}
                    size="medium"
                  />
                </Constraints.Horizontal>
              </Spacings.Stack>
            </Constraints.Horizontal>
          </CollapsiblePanel>
          <RichTextInput
            name={text('name', 'test-name')}
            onBlur={onBlur}
            onFocus={onFocus}
            defaultExpandMultilineText={boolean(
              'defaultExpandMultilineText',
              true
            )}
            placeholder={text('placeholder', 'Placeholder')}
            showExpandIcon={boolean('showExpandIcon', false)}
            onClickExpand={onClickExpand}
            hasError={boolean('hasError', false)}
            hasWarning={boolean('hasWarning', false)}
            isDisabled={boolean('isDisabled', false)}
            isReadOnly={boolean('isReadOnly', false)}
            ref={ref}
            onChange={onChange}
            value={value}
          />
          <Text.Headline as="h3">Output</Text.Headline>
          <pre>{value}</pre>
        </Spacings.Stack>
      </Section>
    );
  });
