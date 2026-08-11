import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { VisualSpec } from '@/storybook-helpers';
import LocalizedMultilineTextInput, {
  TLocalizedMultilineTextInputProps,
} from './localized-multiline-text-input';
import { useState } from 'react';

const meta: Meta<typeof LocalizedMultilineTextInput> = {
  title: 'Form/Inputs/LocalizedMultilineTextInput',
  // @ts-ignore
  component: LocalizedMultilineTextInput,
};
export default meta;

type Story = StoryFn<typeof LocalizedMultilineTextInput>;

export const BasicExample: Story = ({
  defaultExpandMultilineText,
  defaultExpandLanguages,
  ...args
}: TLocalizedMultilineTextInputProps) => {
  const [value, setValue] = useState({
    en: 'Horse\nCow\nDuck',
    de: 'Pferd\nKuh\nEnte',
    'nan-Hant-TW': '馬\n奶牛\n鴨子',
  });

  return (
    <div>
      <LocalizedMultilineTextInput
        defaultExpandLanguages={
          // we need to set undefined instead of false to avoid prop-type
          // warnings in case hideLanguageExpansionControls is true
          defaultExpandLanguages || undefined
        }
        defaultExpandMultilineText={defaultExpandMultilineText}
        data-test="foo"
        {...args}
        value={value}
        onChange={(event) => {
          setValue((currentValue) => ({
            ...currentValue,
            [event.target.language]: event.target.value,
          }));
        }}
      />
      <br />
      <strong>
        <code>value:</code>
      </strong>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
};

BasicExample.args = {
  id: 'product-id',
  name: 'productName',
  additionalInfo: {
    en: '',
    de: '',
    'nan-Hant-TW': '',
  },
  hasError: false,
  hasWarning: false,
  horizontalConstraint: 7,
  placeholder: {
    en: 'placeholder text',
    de: 'Platzhalter text',
    'nan-Hant-TW': '',
  },
  isReadOnly: false,
  isDisabled: false,
  isCondensed: false,
  cacheMeasurements: false,
  isAutofocussed: false,
  defaultExpandMultilineText: false,
  defaultExpandLanguages: false,
  selectedLanguage: 'en',
  hideLanguageExpansionControls: false,
};

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const value = {
  en: lorem,
  de: lorem,
  es: lorem,
};

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
        />
      </VisualSpec>
      <VisualSpec label="when language controls are hidden">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          hideLanguageExpansionControls={true}
        />
      </VisualSpec>
      <VisualSpec label="when languages are opened by default">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when read-only and open">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isReadOnly={true}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when read-only and closed">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled and open">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isDisabled={true}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled and closed">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when isCondensed and open">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isCondensed={true}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when isCondensed and closed">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isCondensed={true}
        />
      </VisualSpec>
      <VisualSpec label="when there is an error for a specific language (first one)">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          errors={{ en: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is an error for a specific language (second one)">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          errors={{ de: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a general error">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="when there is a warning for a specific language (first one)">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          warnings={{ en: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a warning for a specific language (second one)">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          warnings={{ de: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a general warning">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="when there is a additional info set for a locale">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          additionalInfo={{ en: 'This is a foo field' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a additional info and error for a locale">
        <LocalizedMultilineTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          hasError={true}
          errors={{ en: 'Error error error e e e' }}
          additionalInfo={{ en: 'This is a foo field' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a additional info set for a locale without collapse control btn">
        <LocalizedMultilineTextInput
          value={{ en: 'short text' }}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          additionalInfo={{ en: 'This is a foo field' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a additional info set for a locale without collapse control btn and an error">
        <LocalizedMultilineTextInput
          value={{ en: 'short text' }}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          additionalInfo={{ en: 'This is a foo field' }}
          errors={{ en: 'Error error error e e e' }}
        />
      </VisualSpec>
    </>
  ),
};
