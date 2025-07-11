import type { Meta, StoryFn } from '@storybook/react';
import RichTextInput, {
  TRichTextInputProps,
  TChangeEvent,
} from './rich-text-input';
import { useCallback, useRef, useState } from 'react';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Text from '@commercetools-uikit/text';

const meta: Meta<typeof RichTextInput> = {
  title: 'Form/Inputs/RichTextInput',
  // @ts-ignore
  component: RichTextInput,
};
export default meta;

type Story = StoryFn<typeof RichTextInput>;

const initialValue =
  '<h1>Heading</h1><p>This is a paragraph.<br/><br/>New sentence, <strong>same</strong> paragraph, but with <u>soft</u>-linebreak (<em>Shift + Enter</em>).</p>';

// @ts-ignore
export const BasicExample: Story = (args: TRichTextInputProps) => {
  const [value, setValue] = useState(initialValue);
  return (
    <RichTextInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

BasicExample.args = {
  defaultExpandMultilineText: true,
};

/** This demo allows to modify the intial input, do changes and verify if the html-output matches the expectations. */
export const PlaygroundExample: Story = () => {
  const onClickExpand = useCallback(() => {
    // eslint-disable-next-line no-alert
    alert('Expand');
  }, []);

  const onBlur = useCallback(() => console.log('onBlur'), []);
  const onFocus = useCallback(() => console.log('onFocus'), []);
  const ref = useRef(null);
  const [value, setValue] = useState(initialValue);
  const [resetValue, setResetValue] = useState(initialValue);
  const onChange = useCallback(
    (event: TChangeEvent) => {
      setValue((event.target as HTMLInputElement).value);
    },
    [setValue]
  );
  const onResetValueChange = useCallback(
    (event: TChangeEvent) => {
      setResetValue((event.target as HTMLInputElement).value);
    },
    [setResetValue]
  );
  const handleReset = () => {
    // @ts-expect-error todo: fix underlying components and/or types
    ref.current?.resetValue(resetValue);
  };

  return (
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
        name={'test-name'}
        onBlur={onBlur}
        onFocus={onFocus}
        defaultExpandMultilineText={true}
        placeholder={'Placeholder'}
        showExpandIcon={false}
        onClickExpand={() => {
          onClickExpand();
          return true;
        }}
        hasError={false}
        hasWarning={false}
        isDisabled={false}
        isReadOnly={false}
        ref={ref}
        onChange={onChange}
        value={value}
      />
      <Text.Headline as="h3">Output</Text.Headline>
      <code>{value}</code>
    </Spacings.Stack>
  );
};
