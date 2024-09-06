import type { Meta, StoryObj } from '@storybook/react';
import LocalizedRichTextInput, {
  TLocalizedRichTextInputProps,
} from './localized-rich-text-input';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import Spacings from '@commercetools-uikit/spacings';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Text from '@commercetools-uikit/text';

const meta: Meta<typeof LocalizedRichTextInput> = {
  title: 'Form/Inputs/LocalizedRichTextInput',
  // @ts-ignore
  component: LocalizedRichTextInput,
  argTypes: {
    selectedLanguage: {
      control: 'select',
      options: ['de', 'en', 'nan-Hant-TW'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof LocalizedRichTextInput>;

const initialValue = '<h1>H1 <u>heading</u></h1>';

export const BasicExample: Story = ({
  defaultExpandLanguages,
  defaultExpandMultilineText,
  value: propsValue,
  ...args
}: TLocalizedRichTextInputProps) => {
  const ref = useRef(null);

  const [value, setValue] = useState(
    propsValue || {
      en: initialValue,
      de: initialValue,
      'nan-Hant-TW': initialValue,
    }
  );

  const [resetValue, setResetValue] = useState({
    en: initialValue,
    de: initialValue,
    'nan-Hant-TW': initialValue,
  });

  const onChange = useCallback(
    (event) => {
      setValue((currentValue) => ({
        ...currentValue,
        [event.target.language]: event.target.value,
      }));
    },
    [setValue]
  );

  const onResetValueChange =
    (lang: string) => (event: ChangeEvent<HTMLTextAreaElement>) => {
      setResetValue((currentValue) => ({
        ...currentValue,
        [lang]: event.target.value,
      }));
    };

  const handleReset = () => {
    // @ts-ignore
    ref.current?.resetValue(resetValue);
  };

  // We need to force the component to rerender in case a default value
  // is changed. Otherwise the knob would have no effect.
  // We do this by changing the key.
  const key = `${defaultExpandMultilineText}-${defaultExpandLanguages}`;

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
              defaultValue={resetValue.en}
              onChange={onResetValueChange('en')}
              rows={4}
            />
            <textarea
              defaultValue={resetValue.de}
              onChange={onResetValueChange('de')}
              rows={4}
            />
            <textarea
              defaultValue={resetValue['nan-Hant-TW']}
              onChange={onResetValueChange('nan-Hant-TW')}
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
      <LocalizedRichTextInput
        key={key}
        defaultExpandLanguages={
          // we need to set undefined instead of false to avoid prop-type
          // warnings in case hideLanguageExpansionControls is true
          defaultExpandLanguages || undefined
        }
        data-test="foo"
        ref={ref}
        value={value}
        {...args}
        onChange={onChange}
      />
      <Text.Headline as="h3">Output</Text.Headline>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </Spacings.Stack>
  );
};

BasicExample.args = {
  // @ts-ignore
  id: 'test-id',
  name: 'productName',
  defaultExpandLanguages: false,
  defaultExpandMultilineText: false,
  showExpandIcon: false,
  selectedLanguage: 'en',
  hideLanguageExpansionControls: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: {
    en: 'Placeholder',
    de: 'Platzhalter',
    'nan-Hant-TW': '占位符',
  },
  horizontalConstraint: 12,
  hasError: false,
  hasWarning: false,
  value: {
    en: initialValue,
    de: initialValue,
    'nan-Hant-TW': initialValue,
  },
  additionalInfo: {
    de: 'Zusätzliche Informationen können hier dargestellt werden',
    en: 'Additional information can be displayed here',
    'nan-Hant-TW': '額外資訊可以在這裡顯示',
  },
};

/**
 * This story demonstrates how the component looks when it has errors.
 */
// @ts-ignore
export const WithErrors = BasicExample.bind({});

WithErrors.args = {
  ...BasicExample.args,
  additionalInfo: undefined,
  errors: {
    de: 'Fehlertexte sehen so aus',
    en: 'Error messages look like this',
    'nan-Hant-TW': '錯誤訊息看起來像這樣',
  },
};
