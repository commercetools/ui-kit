/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import {
  Samplers,
  Table,
  TokenNameHeaderCell,
  Token,
  GroupStyle,
  DeprecationBadge,
} from './shared-components';
import { getIsDeprecated } from './utils';

const filterChoiceGroupValues = (choices, searchText) =>
  Object.entries(choices).filter(
    ([key, value]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      value.toLowerCase().includes(searchText.toLowerCase())
  );

const getChoiceDetailId = (choicePrefix) => `choice-${choicePrefix}`;

const choicesSamplesMap = {
  color: Samplers.ColorSample,
  'border-radius': Samplers.BorderRadiusSample,
  shadow: Samplers.ShadowSample,
  spacing: Samplers.SpacingSample,
};

const ChoiceGroup = ({ choiceConfig, themesValues }) => {
  const ChoiceSample =
    choicesSamplesMap[choiceConfig.prefix] || Samplers.BasicSample;

  return (
    <GroupStyle isVisible={Object.values(themesValues[0].values).length > 0}>
      <a id={getChoiceDetailId(choiceConfig.prefix)} />
      <h3>{choiceConfig.label}</h3>
      {Boolean(choiceConfig.description) && <p>{choiceConfig.description}</p>}
      <Table>
        <thead>
          <tr>
            <TokenNameHeaderCell>Token</TokenNameHeaderCell>
            {themesValues.map((themeChoicesConfig) => (
              <td key={themeChoicesConfig.themeName}>
                {themeChoicesConfig.themeName}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(themesValues[0].values).map(
            ([tokenName, choiceValue]) => (
              <tr key={tokenName}>
                <td>
                  <>
                    <Token>{tokenName}</Token>
                    {getIsDeprecated(tokenName) && <DeprecationBadge />}
                  </>
                </td>
                {themesValues.map((themeValuesConfig) => (
                  <td
                    key={`${choiceConfig.prefix}_${tokenName}_${themeValuesConfig.themeName}`}
                  >
                    <ChoiceSample value={themeValuesConfig.values[tokenName]} />
                    &nbsp;{themeValuesConfig.values[tokenName]}
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </Table>
    </GroupStyle>
  );
};
ChoiceGroup.propTypes = {
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
  return (
    <>
      <a
        href="#choices"
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({
            top: document.getElementById(document.getElementById('choices'))
              .offsetTop,
            behavior: 'smooth',
          });
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
  return (
    <>
      {Object.entries(choiceGroupsByTheme.default).map(
        ([choiceName, choiceConfig]) => (
          <ChoiceGroup
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
