import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import LocalizedTextInput from './localized-text-input';
import { VisualSpec } from '@/storybook-helpers';
import { useState } from 'react';

const meta: Meta<typeof LocalizedTextInput> = {
  title: 'Form/Inputs/LocalizedTextInput',
  // @ts-ignore
  component: LocalizedTextInput,
  argTypes: {
    selectedLanguage: {
      control: 'select',
      options: ['de', 'en', 'nan-Hant-TW'],
    },
  },
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

const value = {
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
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
        />
      </VisualSpec>
      <VisualSpec label="when languages are expanded by default">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when expansion controls are hidden">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          hideLanguageExpansionControls={true}
        />
      </VisualSpec>
      <VisualSpec label="when read-only and open">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isReadOnly={true}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when read-only and closed">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled and open">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isDisabled={true}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled and closed">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when isCondensed and open">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isCondensed={true}
          defaultExpandLanguages={true}
        />
      </VisualSpec>
      <VisualSpec label="when isCondensed and closed">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          isCondensed={true}
        />
      </VisualSpec>
      <VisualSpec label="when there is an error for a specific language (first one)">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          errors={{ en: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is an error for a specific language (second one)">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          errors={{ de: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a general error">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="when there is a warning for a specific language (first one)">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          warnings={{ en: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a warning for a specific language (second one)">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          warnings={{ de: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a general warning">
        <LocalizedTextInput
          value={value}
          onChange={() => {}}
          selectedLanguage="en"
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
    </>
  ),
};
