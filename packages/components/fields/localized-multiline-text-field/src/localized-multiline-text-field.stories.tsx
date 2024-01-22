import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Value } from 'react-value';
import {
  iconArgType,
  horizontalConstraintArgType,
  hideControls,
} from '@/storybook-helpers';
import { ErrorMessage } from '@commercetools-uikit/messages';
import LocalizedMultilineTextField, {
  type TLocalizedMultilineTextFieldProps,
} from './localized-multiline-text-field';

type TLocalizedMultilineTextFieldPropsAndCustomArgs =
  TLocalizedMultilineTextFieldProps & {
    showInfoButton?: boolean;
    showErrorsByLanguage?: boolean;
  };

const meta = {
  title: 'Components/Fields/LocalizedMultilineTextField',
  component: LocalizedMultilineTextField,
  tags: ['autodocs'],
} satisfies Meta<TLocalizedMultilineTextFieldPropsAndCustomArgs>;

export default meta;
type Story = StoryObj<TLocalizedMultilineTextFieldPropsAndCustomArgs>;

const defaultValue = {
  en: 'Parrot that knows how to party',
  de: 'Papagei der ordentlich abfeiert',
};

export const Default: Story = {
  args: {
    hint: 'More information about the product',
    name: 'description',
    errors: {},
    hideLanguageExpansionControls: false,
    defaultExpandLanguages: false,
    isAutofocussed: false,
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    touched: false,
    defaultExpandMultilineText: false,
    title: 'Description',
    description: '',
    placeholder: { en: 'Placeholder' },
    showInfoButton: false,
    showErrorsByLanguage: false,
    badge: '',
    selectedLanguage: Object.keys(defaultValue)[0],
  },
  argTypes: {
    hintIcon: iconArgType,
    horizontalConstraint: horizontalConstraintArgType({
      min: 6,
    }),
    selectedLanguage: {
      control: 'select',
      options: Object.keys(defaultValue),
    },
    ...hideControls(['onChange', 'value', 'id', 'errorsByLanguage']),
  },
  render: (args) => {
    return (
      <Value
        defaultValue={defaultValue}
        render={(value, onChange) => {
          const key = `${args.defaultExpandMultilineText}-${args.defaultExpandLanguages}`;

          return (
            <LocalizedMultilineTextField
              key={key}
              id={args.name?.trim() === '' ? undefined : args.name}
              horizontalConstraint={args.horizontalConstraint}
              errors={args.errors}
              renderError={(errorKey) => {
                switch (errorKey) {
                  case 'customError':
                    return 'A custom error.';
                  default:
                    return null;
                }
              }}
              isRequired={args.isRequired}
              touched={args.touched}
              name={args.name}
              value={value}
              onChange={(event) => {
                onChange({
                  ...value,
                  [event.target.language]: event.target.value,
                });
              }}
              selectedLanguage={args.selectedLanguage}
              hideLanguageExpansionControls={args.hideLanguageExpansionControls}
              defaultExpandLanguages={
                // we need to set undefined instead of false to avoid prop-type
                // warnings in case hideLanguageExpansionControls is true
                args.defaultExpandLanguages || undefined
              }
              defaultExpandMultilineText={args.defaultExpandMultilineText}
              isAutofocussed={args.isAutofocussed}
              isDisabled={args.isDisabled}
              isReadOnly={args.isReadOnly}
              placeholder={args.placeholder}
              errorsByLanguage={
                args.showErrorsByLanguage
                  ? Object.keys(value).reduce<Record<string, ReactElement>>(
                      (acc, language) => {
                        acc[language] = (
                          <ErrorMessage>An error for language</ErrorMessage>
                        );
                        return acc;
                      },
                      {}
                    )
                  : undefined
              }
              title={args.title}
              hint={args.hint}
              description={args.description}
              onInfoButtonClick={args.showInfoButton ? () => {} : undefined}
              hintIcon={args.hintIcon}
              badge={args.badge}
            />
          );
        }}
      />
    );
  },
};
