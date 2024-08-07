import type { Meta, StoryFn } from '@storybook/react';
import LocalizedTextField, {
  TLocalizedTextFieldProps,
} from './localized-text-field';
import { useState } from 'react';

const meta: Meta<typeof LocalizedTextField> = {
  title: 'Form/Fields/LocalizedTextField',
  // @ts-expect-error, fix component and/or component types
  component: LocalizedTextField,
  argTypes: {
    // @ts-expect-error
    selectedLanguage: {
      control: 'select',
      options: ['en', 'de'],
    },
  },
};
export default meta;

type Story = StoryFn<typeof LocalizedTextField>;

// @ts-expect-error
export const BasicExample: Story = (args: TLocalizedTextFieldProps) => {
  const { defaultExpandLanguages } = args;
  const [value, onChange] = useState({
    en: 'Parrot that knows how to party',
    de: 'Papagei der ordentlich abfeiert',
  });

  return (
    <LocalizedTextField
      {...args}
      value={value}
      onChange={(event) => {
        onChange({
          ...value,
          [event.target.language]: event.target.value,
        });
      }}
      defaultExpandLanguages={
        // we need to set undefined instead of false to avoid prop-type
        // warnings in case hideLanguageExpansionControls is true
        defaultExpandLanguages || undefined
      }
    />
  );
};

BasicExample.args = {
  // @ts-expect-error
  id: 'ltf-id',
  name: 'ltf-name',
  horizontalConstraint: 7,
  errors: null,
  warnings: {
    customWarning: true,
  },
  renderWarning: (key: string) => {
    switch (key) {
      case 'customWarning':
        return 'A custom warning.';
      default:
        return null;
    }
  },
  isRequired: false,
  touched: false,
  selectedLanguage: 'en',
  hideLanguageExpansionControls: false,
  defaultExpandLanguages: false,
  isAutofocussed: false,
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: {
    en: 'Placeholder',
    de: 'Platzhalter',
  },
  additionalInfo: {
    en: 'additional info for language en',
    de: 'zusätzliche Informationen für die Sprache de',
  },
  title: 'Description',
  hint: 'More information about the product',
  description: '',
  onInfoButtonClick: () => alert('Info button clicked'),
  badge: '',
};

export const WithError = BasicExample.bind({});

WithError.args = {
  ...BasicExample.args,
  // @ts-expect-error
  errorsByLanguage: {
    en: 'An error for language en',
    de: 'Ein Fehler für die Sprache de',
  },
};
