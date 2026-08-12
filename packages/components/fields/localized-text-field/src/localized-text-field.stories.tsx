import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { VisualSpec } from '@/storybook-helpers';
import LocalizedTextField, {
  TLocalizedTextFieldProps,
} from './localized-text-field';
import { useState } from 'react';
import { iconArgType } from '@/storybook-helpers';

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
    hintIcon: iconArgType,
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

const visualValue = {
  en: 'hello world',
  de: 'hallo welt',
  es: 'hola mundo',
};
export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when languages are opened by default">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when expansion controls are hidden">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          hideLanguageExpansionControls={true}
        />
      </VisualSpec>
      <VisualSpec label="when read-only and open">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isReadOnly={true}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when read-only and closed">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled and open">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isDisabled={true}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled and closed">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when condensed and open">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isCondensed={true}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when condensed and closed">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isCondensed={true}
        />
      </VisualSpec>
      <VisualSpec label="when there is an error and the field is not touched">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          errors={{ missing: true }}
        />
      </VisualSpec>
      <VisualSpec label="when there is an error and the field is touched">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          errors={{ missing: true }}
          touched={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning when not touched">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with warning when touched">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          touched={true}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with error and additional info when touched">
        <LocalizedTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          errors={{ missing: true }}
          additionalInfo={{ en: 'Some intel' }}
          touched={true}
        />
      </VisualSpec>
    </>
  ),
};
