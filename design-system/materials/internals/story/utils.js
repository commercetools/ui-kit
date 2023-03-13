import definition from '../definition.yaml';
import deprecatedTokens from '../deprecated-tokens';

export const choiceGroupsByTheme =
  process.env.NODE_ENV !== 'production'
    ? definition.choiceGroupsByTheme
    : { default: definition.choiceGroupsByTheme.default };

export const allThemesNames = Object.keys(choiceGroupsByTheme);

export const getIsDeprecated = (token) => deprecatedTokens.includes(token);
