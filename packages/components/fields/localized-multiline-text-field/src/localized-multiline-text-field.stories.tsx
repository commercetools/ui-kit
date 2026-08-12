import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { iconArgType, VisualSpec } from '@/storybook-helpers';
import LocalizedMultilineTextField, {
  TLocalizedMultilineTextFieldProps,
} from './localized-multiline-text-field';
import { useState } from 'react';

const meta: Meta<typeof LocalizedMultilineTextField> = {
  title: 'Form/Fields/LocalizedMultilineTextField',
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

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const visualValue = {
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
        <LocalizedMultilineTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
        />
      </VisualSpec>
      <VisualSpec label="when language controls are hidden">
        <LocalizedMultilineTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          hideLanguageExpansionControls={true}
        />
      </VisualSpec>
      <VisualSpec label="when languages are opened by default">
        <LocalizedMultilineTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when read-only and open">
        <LocalizedMultilineTextField
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
        <LocalizedMultilineTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled and open">
        <LocalizedMultilineTextField
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
        <LocalizedMultilineTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when condensed and open">
        <LocalizedMultilineTextField
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
        <LocalizedMultilineTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isCondensed={true}
        />
      </VisualSpec>
      <VisualSpec label="when there is an error and the field is not touched">
        <LocalizedMultilineTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          errors={{ missing: true }}
        />
      </VisualSpec>
      <VisualSpec label="when there is an error and the field is touched">
        <LocalizedMultilineTextField
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
        <LocalizedMultilineTextField
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
        <LocalizedMultilineTextField
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
      <VisualSpec label="with additional info">
        <LocalizedMultilineTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          touched={true}
          additionalInfo={{ en: 'hello here is an info' }}
        />
      </VisualSpec>
      <VisualSpec label="with additional info and error">
        <LocalizedMultilineTextField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          touched={true}
          errors={{ missing: true }}
          additionalInfo={{ en: 'hello here is an info' }}
        />
      </VisualSpec>
    </>
  ),
};
