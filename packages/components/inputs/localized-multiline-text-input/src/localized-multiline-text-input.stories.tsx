import type { Meta, StoryFn } from '@storybook/react';
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
    'nan-Hant-TW': '马\n奶牛\n鸭子',
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
