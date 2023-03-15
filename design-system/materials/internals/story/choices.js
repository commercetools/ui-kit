/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import upperFirst from 'lodash/upperFirst';
import {
  Samplers,
  Table,
  TokenNameHeaderCell,
  Token,
  GroupStyle,
  DeprecationBadge,
} from './shared-components';
import { allThemesNames, choiceValueResolver, getIsDeprecated } from './utils';

const getChoiceDetailId = (choicePrefix) => `choices-${choicePrefix}`;

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

export const ChoicesDetailsListBak = ({ choiceGroupsByTheme }) => {
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

const TableHeader = ({ choiceName }) => (
  <thead>
    <tr>
      <TokenNameHeaderCell>Token</TokenNameHeaderCell>
      {allThemesNames.map((themeName) => (
        <td key={`choices-${choiceName}-${themeName}-header-key`}>
          {themeName}
        </td>
      ))}
    </tr>
  </thead>
);

const TableBody = ({ choiceConfig, choiceGroupsByTheme }) => (
  <tbody>
    {Object.keys(choiceConfig.choices).map((tokenName) => {
      const ChoiceSample =
        choicesSamplesMap[choiceConfig.prefix] || Samplers.BasicSample;
      return (
        <tr key={`choices-${tokenName}-body-key`}>
          <td>
            <Token>{tokenName}</Token>
            {getIsDeprecated(tokenName) && <DeprecationBadge />}
          </td>
          {Object.keys(choiceGroupsByTheme).map((themeName) => {
            const choiceValue = choiceValueResolver(tokenName, themeName);
            return (
              <td key={`choices-${tokenName}-${themeName}-body-key`}>
                <ChoiceSample value={choiceValue} />
                &nbsp;{choiceValue}
              </td>
            );
          })}
        </tr>
      );
    })}
  </tbody>
);

export const ChoicesDetailsList = (props) => {
  return (
    <>
      <h2 id={props.id}>{props.title || upperFirst(props.id)}</h2>
      {props.subtitle && <p>{props.subtitle}</p>}
      {Object.entries(props.choiceGroupsByTheme.default).map(
        ([choiceName, choiceConfig]) => (
          <GroupStyle key={`choice-group_${choiceName}`} isVisible>
            <a id={`choices-${choiceConfig.prefix}`} />
            <h3>{choiceConfig.label}</h3>
            {Boolean(choiceConfig.description) && (
              <p>{choiceConfig.description}</p>
            )}
            <Table>
              <TableHeader choiceName={choiceName} />
              <TableBody
                choiceConfig={choiceConfig}
                choiceGroupsByTheme={props.choiceGroupsByTheme}
              />
            </Table>
          </GroupStyle>
        )
      )}
    </>
  );
};
ChoicesDetailsList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  choiceGroupsByTheme: PropTypes.object.isRequired,
};
