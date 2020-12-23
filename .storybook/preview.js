import { IntlProvider } from 'react-intl';
import * as messages from '@commercetools-uikit/i18n';

const slugifyLocale = (locale) => {
  switch (locale) {
    case 'frFR':
      return 'fr-FR';
    case 'zhCN':
      return 'zh-CN';
    default:
      return locale;
  }
};

const IntlWrapper = (props) => {
  const locale = props.locale;
  return (
    <IntlProvider locale={slugifyLocale(locale)} messages={messages[locale]}>
      {props.children}
    </IntlProvider>
  );
};
const withIntlProvider = (Story, context) => {
  const locale = context.globals.locale;
  return (
    <IntlProvider locale={slugifyLocale(locale)} messages={messages[locale]}>
      <Story {...context} />
    </IntlProvider>
  );
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Pages', 'Components'],
    },
  },
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'de', right: '🇩🇪', title: 'Deutsch' },
        { value: 'fr', right: '🇫🇷', title: 'Français' },
        { value: 'es', right: '🇪🇸', title: 'Español' },
        { value: 'zh', right: '🇨🇳', title: '简化字' },
        { value: 'kr', right: '🇰🇷', title: '日本人' },
      ],
    },
  },
};

export const decorators = [withIntlProvider];
