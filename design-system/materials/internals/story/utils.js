import definition from '../definition.yaml';
import deprecatedTokens from '../deprecated-tokens';

export const choiceGroupsByTheme =
  process.env.NODE_ENV !== 'production'
    ? definition.choiceGroupsByTheme
    : { default: definition.choiceGroupsByTheme.default };

export const allThemesNames = Object.keys(choiceGroupsByTheme);

const getThemeChoiceByName = (theme, choiceName) => {
  return Object.values(theme)
    .map((choiceGroup) => choiceGroup.choices)
    .find((choices) => choices[choiceName]);
};

export const choiceValueResolver = (choiceName, themeName) => {
  const defaultChoice = getThemeChoiceByName(
    choiceGroupsByTheme.default,
    choiceName
  );

  const themeChoice = getThemeChoiceByName(
    choiceGroupsByTheme[themeName],
    choiceName
  );

  // console.log({
  //   choiceName,
  //   themeName,
  //   defaultChoice,
  //   defaultValue: defaultChoice?.[choiceName],
  //   themeChoice: themeChoice?.[choiceName],
  //   result: themeChoice?.[choiceName] ?? defaultChoice?.[choiceName],
  // });

  return themeChoice?.[choiceName] ?? defaultChoice?.[choiceName];
};

export const getIsDeprecated = (token) => deprecatedTokens.includes(token);
