import intlContext from './intl-context';
import themeContext from './theme-context';

export const contexts = [
  intlContext,
  process.env.NODE_ENV !== 'production' ? themeContext : null,
  /* ... */ // multiple contexts setups are supported
].filter(Boolean);
