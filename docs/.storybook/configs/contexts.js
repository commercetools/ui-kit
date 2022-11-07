import intlContext from './intl-context';
import themeContext from './theme-context';

// We only want to show the theme switcher in local environment
// or in preview deployments
const shouldIncludeThemeContext = () =>
  process.env.NODE_ENV !== 'production' || process.env.VERCEL_URL === 'preview';

console.log('vne:', process.env.VERCEL_URL);

export const contexts = [
  intlContext,
  shouldIncludeThemeContext() ? themeContext : null,
  /* ... */ // multiple contexts setups are supported
].filter(Boolean);
