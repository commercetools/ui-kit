/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import styled from '@emotion/styled';
import {
  Table,
  TokenNameHeaderCell,
  Token,
  DeprecationBadge,
} from './shared-components';
import { allThemesNames, choiceGroupsByTheme, getIsDeprecated } from './utils';

// const getThemeChoiceByName = (theme, choiceName) => {
//   return Object.values(theme)
//     .map((choiceGroup) => choiceGroup.choices)
//     .find((choices) => choices[choiceName]);
// }

// const getChoiceValue = (choiceName, theme) => {
//   const defaultChoice = getThemeChoiceByName(
//     choiceGroupsByTheme.default,
//     choiceName
//   );

//   const themeChoice = getThemeChoiceByName(
//     choiceGroupsByTheme[theme],
//     choiceName
//   );

//   return defaultChoice
//     ? themeChoice?.[choiceName] ?? defaultChoice[choiceName]
//     : undefined;
// };

const filterChoiceGroupValues = (choices, searchText) =>
  Object.entries(choices).filter(
    ([key, value]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      value.toLowerCase().includes(searchText.toLowerCase())
  );

const getDefaultThemeChoiceGroupProperty = (choiceGroup, property) =>
  choiceGroupsByTheme.default[choiceGroup][property];

const getChoiceDetailId = (choicePrefix) => `choice-${choicePrefix}`;

const GroupStyle = styled.div`
  padding: 10px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

const ChoiceGroup = (props) => {
  const choices = Object.entries(choiceGroupsByTheme).reduce(
    (acc, [theme, themeChoices]) => {
      // default theme is used as a blueprint
      const themeChoicesBasedOnDefaultTheme = merge(
        {},
        choiceGroupsByTheme.default,
        themeChoices
      );
      const filteredThemeChoices = Object.fromEntries(
        filterChoiceGroupValues(
          themeChoicesBasedOnDefaultTheme[props.choiceGroup].choices,
          props.searchText
        )
      );
      const filteredThemeChoicesNames = Object.keys(filteredThemeChoices);

      return merge(
        acc,
        ...filteredThemeChoicesNames.map((name) => ({
          [name]: { [theme]: filteredThemeChoices[name] },
        }))
      );
    },
    {}
  );

  return (
    <GroupStyle isVisible={Object.values(choices).length > 0}>
      <a id={getChoiceDetailId(props.choiceGroup)} />
      <h3>{getDefaultThemeChoiceGroupProperty(props.choiceGroup, 'label')}</h3>
      {getDefaultThemeChoiceGroupProperty(props.choiceGroup, 'description') && (
        <p>
          {getDefaultThemeChoiceGroupProperty(props.choiceGroup, 'description')}
        </p>
      )}
      <Table>
        <thead>
          <tr>
            <TokenNameHeaderCell>Token</TokenNameHeaderCell>
            {allThemesNames.map((theme) => {
              return <td key={theme}>{theme}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {Object.entries(choices).map(([name, values]) => (
            <tr key={name}>
              <td>
                <>
                  <Token>{name}</Token>
                  {getIsDeprecated(name) && <DeprecationBadge />}
                </>
              </td>
              {Object.entries(values).map(([theme, value]) => (
                <td key={theme}>{props.renderSample(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </GroupStyle>
  );
};
ChoiceGroup.displayName = 'ChoiceGroup';
ChoiceGroup.propTypes = {
  searchText: PropTypes.string.isRequired,
  choiceGroup: PropTypes.shape({
    label: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    description: PropTypes.string,
    choices: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  renderSample: PropTypes.func.isRequired,
};
ChoiceGroup.defaultProps = {
  renderSample: (value) => value,
};

const ChoiceGroupV2 = ({ choiceConfig, themesValues }) => {
  console.log('ChoiceGroupV2# render:', { choiceConfig, themesValues });
  return (
    <GroupStyle isVisible={Object.values(themesValues[0].values).length > 0}>
      <a id={getChoiceDetailId(choiceConfig.prefix)} />
      <h3>{choiceConfig.label}</h3>
      {Boolean(choiceConfig.description) && <p>{choiceConfig.description}</p>}
      <Table>
        <thead>
          <tr>
            <TokenNameHeaderCell>Token</TokenNameHeaderCell>
            {themesValues.map((themeChoicesConfig) => {
              return (
                <td key={themeChoicesConfig.themeName}>
                  {themeChoicesConfig.themeName}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {/* {Object.entries(choices).map(([name, values]) => (
            <tr key={name}>
              <td>
                <>
                  <Token>{name}</Token>
                  {getIsDeprecated(name) && <DeprecationBadge />}
                </>
              </td>
              {Object.entries(values).map(([theme, value]) => (
                <td key={theme}>{props.renderSample(value)}</td>
              ))}
            </tr>
          ))} */}
          {Object.entries(themesValues[0].values).map(
            ([tokenName, choiceValue]) => (
              <tr key={tokenName}>
                <td>
                  <>
                    <Token>{tokenName}</Token>
                    {getIsDeprecated(tokenName) && <DeprecationBadge />}
                  </>
                </td>
                <td>{choiceValue}</td>
                <td>{choiceValue}</td>
                {/* {Object.entries(values).map(([theme, value]) => (
                  <td key={theme}>{props.renderSample(value)}</td>
                ))} */}
              </tr>
            )
          )}
        </tbody>
      </Table>
    </GroupStyle>
  );
};
ChoiceGroupV2.propTypes = {
  choiceConfig: PropTypes.shape({
    label: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  themesValues: PropTypes.arrayOf(
    PropTypes.shape({
      themeName: PropTypes.string.isRequired,
      values: PropTypes.object,
    })
  ),
};

export const ChoicesLinks = ({ config, filterText }) => {
  console.log('ChoicesLinks# render ', { config });
  return (
    <>
      <a
        href="#choices"
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo(0, document.getElementById('choices').offsetTop);
        }}
      >
        Choices
      </a>
      <ul>
        {Object.entries(config).map(
          ([key, choiceGroup]) =>
            filterChoiceGroupValues(choiceGroup.choices, filterText).length >
              0 && (
              <li key={key}>
                <a
                  href={`#${getChoiceDetailId(choiceGroup.prefix)}`}
                  onClick={(event) => {
                    event.preventDefault();
                    window.scrollTo({
                      top: document.getElementById(
                        getChoiceDetailId(choiceGroup.prefix)
                      ).offsetTop,
                      behavior: 'smooth',
                    });
                  }}
                >
                  {choiceGroup.label}
                </a>
              </li>
            )
        )}
      </ul>
    </>
  );
};
ChoicesLinks.propTypes = {
  config: PropTypes.object.isRequired,
  filterText: PropTypes.string.isRequired,
};

export const ChoicesDetailsList = ({ choiceGroupsByTheme }) => {
  console.log('ChoicesDetailsList# render:', { choiceGroupsByTheme });
  return (
    <>
      {Object.entries(choiceGroupsByTheme.default).map(
        ([choiceName, choiceConfig]) => (
          <ChoiceGroupV2
            key={choiceConfig.prefix}
            choiceConfig={choiceConfig}
            themesValues={Object.keys(choiceGroupsByTheme).map((themeName) => ({
              themeName,
              values: merge(
                {},
                choiceGroupsByTheme.default,
                choiceGroupsByTheme[themeName]
              )[choiceName].choices,
            }))}
          />
        )
      )}
    </>
  );
};

// const themeChoicesBasedOnDefaultTheme = merge(
//   {},
//   choiceGroupsByTheme.default,
//   choiceGroupsByTheme.test
// );

// ChoiceGroupV2.propTypes = {
//   choiceConfig: PropTypes.shape({
//     label: PropTypes.string.isRequired,
//     prefix: PropTypes.string.isRequired,
//     description: PropTypes.string,
//   }),
//   themesValues: PropTypes.arrayOf(PropTypes.shape({
//     themeName: PropTypes.string.isRequired,
//     values: PropTypes.shape({
//       tokenName: PropTypes.string.isRequired,
//       value: PropTypes.string
//     })
//   }))
// };
