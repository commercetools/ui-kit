import type { Decorator } from '@storybook/react';
import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';

export const locales = ['en', 'en-GB', 'de', 'es', 'fr-FR', 'zh-CN'];

const getMessagesForLocale = (locale: string) => {
  switch (locale) {
    case 'en': // This is american english
      return import('../../packages/i18n/data/en.json');
    case 'en-GB':
      return import('../../packages/i18n/data/en.json');
    case 'es':
      return import('../../packages/i18n/data/es.json');
    case 'de':
      return import('../../packages/i18n/data/de.json');
    case 'fr-FR':
      return import('../../packages/i18n/data/fr-FR.json');
    case 'zh-CN':
      return import('../../packages/i18n/data/zh-CN.json');
    default:
      throw new Error(`Unable to load messages for locale ${locale}.`);
  }
};

const withIntlDecorator: Decorator = (Story, context) => {
  const [messages, setMessages] = useState({});
  const locale = context.globals.locale;
  useEffect(() => {
    getMessagesForLocale(locale).then((_messages) =>
      setMessages(_messages.default)
    );
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Story />
    </IntlProvider>
  );
};

export default withIntlDecorator;
