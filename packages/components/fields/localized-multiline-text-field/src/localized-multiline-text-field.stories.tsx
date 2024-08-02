import type { Meta, StoryFn } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';
import LocalizedMultilineTextField, {
  TLocalizedMultilineTextFieldProps,
} from './localized-multiline-text-field';
import { useState } from 'react';

const meta: Meta<typeof LocalizedMultilineTextField> = {
  title: 'field/LocalizedMultilineTextField',
  // @ts-expect-error, @todo fix component/types
  component: LocalizedMultilineTextField,
  argTypes: {
    // @ts-expect-error
    selectedLanguage: {
      control: 'select',
      options: ['en', 'de'],
    },
    placeholder: { control: 'text' },
    title: { control: 'text' },
    hint: { control: 'text' },
    description: { control: 'text' },
    badge: { control: 'text' },
    hintIcon: iconArgType,
  },
};

export default meta;

type Story = StoryFn<typeof LocalizedMultilineTextField>;

// @ts-expect-error
export const BasicExample: Story = (
  args: TLocalizedMultilineTextFieldProps
) => {
  const [value, onChange] = useState({
    en: 'Parrot that knows how to party',
    de: 'Papagei der ordentlich abfeiert',
  });

  const { defaultExpandMultilineText, defaultExpandLanguages } = args;

  const key = `${defaultExpandMultilineText}-${defaultExpandLanguages}`;

  return (
    <LocalizedMultilineTextField
      {...args}
      key={key}
      value={value}
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
  // @ts-expect-error
  id: 'lmtf-id',
  name: 'lmtf-name',
  horizontalConstraint: 7,
  errors: null,
  renderError: (errorKey: string) => {
    switch (errorKey) {
      case 'customError':
        return 'A custom error.';
      default:
        return null;
    }
  },
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
  defaultExpandMultilineText: false,
  isAutofocussed: false,
  cacheMeasurements: false,
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: 'Placeholder...',
  /* , */
  additionalInfo: {
    en: 'Additional information',
    de: 'Zusätzliche Informationen',
  },
  title: 'Description',
  hint: 'More information about the product',
  description: '',
  onInfoButtonClick: () => alert('You clicked the info-button!'),
  badge: '',
};

export const WithError = BasicExample.bind({});

WithError.args = {
  ...BasicExample.args,
  // @ts-expect-error
  errorsByLanguage: {
    en: 'A sample error',
    de: 'Ein Beispiel-Fehler',
  },
};
