import type { Decorator } from '@storybook/react';
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { default as en } from '../../../packages/i18n/data/en.json';

export const locales = ['en', 'en-GB', 'de', 'es', 'fr-FR', 'zh-CN'];

interface TranslationItem {
  developer_comment: string;
  string: string;
}
interface TranslationFile {
  [key: string]: TranslationItem;
}

interface TranslationObject {
  [key: string]: string;
}

const formatTranslations = (messages: TranslationFile) => {
  return Object.entries(messages).reduce(
    (messages, [messageKey, messageValue]) => ({
      ...messages,
      [messageKey]: messageValue.string ?? messageValue,
    }),
    {}
  );
};

const getMessagesForLocale = (
  locale: string
): Promise<{ default: TranslationFile }> => {
  switch (locale) {
    case 'en':
      return new Promise((resolve) => resolve({ default: en }));
    case 'en-GB':
      return import('../../../packages/i18n/data/en.json');
    case 'es':
      return import('../../../packages/i18n/data/es.json');
    case 'de':
      return import('../../../packages/i18n/data/de.json');
    case 'fr-FR':
      return import('../../../packages/i18n/data/fr-FR.json');
    case 'zh-CN':
      return import('../../../packages/i18n/data/zh-CN.json');
    default:
      throw new Error(`Unable to load messages for locale ${locale}.`);
  }
};

export const WithIntlDecorator: Decorator = (Story, context) => {
  const locale = context.globals.locale || 'en';
  const [messages, setMessages] = useState<TranslationObject>(
    formatTranslations(en)
  );

  useEffect(() => {
    async function fetchLocale(locale: string) {
      const { default: messagesForLocale } = await getMessagesForLocale(locale);

      const normalizedMessages = formatTranslations(messagesForLocale);
      setMessages(normalizedMessages);
    }

    fetchLocale(locale);
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <Story {...context} />
    </IntlProvider>
  );
};
