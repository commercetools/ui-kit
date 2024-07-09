import type { Meta, StoryFn } from '@storybook/react';
import LocalizedTextInput from './localized-text-input';
import { useState } from 'react';

const meta: Meta<typeof LocalizedTextInput> = {
  title: 'form/LocalizedTextInput',
  // @ts-ignore
  component: LocalizedTextInput,
};
export default meta;

type Story = StoryFn<typeof LocalizedTextInput>;

export const BasicExample: Story = ({
  defaultExpandLanguages,
  value: propsValue,
  ...args
}) => {
  const [value, onChange] = useState(
    propsValue || { en: '', de: '', 'nan-Hant-TW': '' }
  );

  // We need to force the component to rerender in case a default value
  // is changed. Otherwise the knob would have no effect.
  // We do this by changing the key.
  const key = defaultExpandLanguages ? 'yes' : 'no';

  return (
    <LocalizedTextInput
      key={key}
      value={value}
      defaultExpandLanguages={defaultExpandLanguages}
      {...args}
      onChange={(event) => {
        onChange({
          ...value,
          [event.target.language]: event.target.value,
        });
      }}
    />
  );
};

BasicExample.args = {
  defaultExpandLanguages: false,
  selectedLanguage: 'en',
  hideLanguageExpansionControls: false,
  isAutofocussed: false,
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: { en: 'Placeholder', de: 'Platzhalter' },
  horizontalConstraint: 7,
  hasError: false,
  hasWarning: false,
};
