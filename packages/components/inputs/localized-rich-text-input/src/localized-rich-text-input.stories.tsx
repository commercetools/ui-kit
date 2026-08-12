import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisualSpec } from '@/storybook-helpers';
import LocalizedRichTextInput, {
  type TLocalizedRichTextInputProps,
  type TCustomEvent,
} from './localized-rich-text-input';
import { type ChangeEvent, useCallback, useRef, useState } from 'react';
import Spacings from '@commercetools-uikit/spacings';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Text from '@commercetools-uikit/text';

interface HTMLLocalizedInputElement extends HTMLInputElement {
  language: string;
}

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
    (event: ChangeEvent<HTMLLocalizedInputElement>) => {
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
        onChange={onChange as (event: TCustomEvent) => void}
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

// Renamed to avoid the `initialValue` the demo stories declare above.
const visualLorem =
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';

const visualInitialValue = {
  en: visualLorem,
  de: visualLorem,
  es: visualLorem,
};

const complexMarkup =
  '<ol><li><span style="font-weight: bold; font-family: &quot;Comic Sans MS&quot;;">Computermouse for <span style="text-decoration-line: underline;">controlling</span></span></li></ol><span><table class="table table-bordered"><tbody><tr><td>hello</td></tr><tr><td><p>world<img src="https://www.rollingstone.com/wp-content/uploads/2019/01/shutterstock_10010937aj.jpg" style="width: 100%; float: right;" class="pull-right img-circle"></p></td></tr></tbody></table></span><ol><li><span style="font-weight: bold; font-family: &quot;Comic Sans MS&quot;;">';

const visualInitialValueWithComplexMarkup = {
  en: complexMarkup,
  de: complexMarkup,
  es: complexMarkup,
};

const emptyValue = '';

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <LocalizedRichTextInput
          onChange={() => {}}
          value={{
            en: emptyValue,
            de: emptyValue,
            es: emptyValue,
          }}
          selectedLanguage="en"
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when multiline text is expanded by default">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          defaultExpandMultilineText={true}
        />
      </VisualSpec>
      <VisualSpec label="when multiline text and languages are expanded by default">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          defaultExpandMultilineText={true}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when language controls are hidden">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          hideLanguageExpansionControls={true}
        />
      </VisualSpec>
      <VisualSpec label="when languages are opened by default">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when read-only and open">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isReadOnly={true}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when read-only and closed">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled and open">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isDisabled={true}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled and closed">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when there is an error for a specific language (first one)">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          errors={{ en: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is an error for a specific language (second one)">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          errors={{ de: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a general error">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="when there is a warning for a specific language (first one)">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          warnings={{ en: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a warning for a specific language (second one)">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          warnings={{ de: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a general warning">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="when showExpandIcon is enabled">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          showExpandIcon={true}
          onClickExpand={() => false}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isDisabled={true}
          onClickExpand={() => false}
        />
      </VisualSpec>
      <VisualSpec label="when readonly">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isReadOnly={true}
          onClickExpand={() => false}
        />
      </VisualSpec>
      <VisualSpec label="with complex markup">
        <LocalizedRichTextInput
          onChange={() => {}}
          value={visualInitialValueWithComplexMarkup}
          selectedLanguage="en"
          horizontalConstraint={7}
          defaultExpandMultilineText={true}
        />
      </VisualSpec>
      <VisualSpec label="when there is a additional info set for a locale">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          additionalInfo={{ en: 'This is a foo field' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a additional info and error for a locale">
        <LocalizedRichTextInput
          value={visualInitialValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          errors={{ en: 'Error error error e e e' }}
          additionalInfo={{ en: 'This is a foo field' }}
        />
      </VisualSpec>
    </>
  ),
};
