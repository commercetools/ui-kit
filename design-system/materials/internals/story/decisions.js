/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import {
  Samplers,
  Table,
  TokenNameHeaderCell,
  Token,
  GroupStyle,
  Description,
  DeprecationBadge,
} from './shared-components';
import { choiceValueResolver, getIsDeprecated } from './utils';
import { useTheme } from '@commercetools-uikit/design-system';

const getDecisionDetailId = (decisionPrefix) => `decision-${decisionPrefix}`;

const filterDecisionGroupValues = (decisions, filterText) =>
  Object.entries(decisions).filter(([key, decision]) => {
    return (
      key.toLowerCase().includes(filterText.toLowerCase()) ||
      decision.choice.toLowerCase().includes(filterText.toLowerCase())
    );
  });

const choicesSamplesMap = {
  'background-color': Samplers.ColorSample,
  'border-color': Samplers.ColorSample,
  'border-radius': Samplers.BorderRadiusSample,
  'font-color': Samplers.FontColorSample,
  shadow: Samplers.ShadowSample,
};

export const DecisionsLinks = ({ config, filterText }) => {
  return (
    <>
      <a
        href="#decisions"
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({
            top: document.getElementById('decisions').offsetTop,
            behavior: 'smooth',
          });
        }}
      >
        Decisions
      </a>
      <ul>
        {Object.entries(config).map(
          ([key, decisionGroup]) =>
            filterDecisionGroupValues(decisionGroup.decisions, filterText)
              .length > 0 && (
              <li key={key}>
                <a
                  href={`#${getDecisionDetailId(decisionGroup.prefix)}`}
                  onClick={(event) => {
                    event.preventDefault();
                    window.scrollTo({
                      top: document.getElementById(
                        getDecisionDetailId(decisionGroup.prefix)
                      ).offsetTop,
                      behavior: 'smooth',
                    });
                  }}
                >
                  {decisionGroup.label}
                </a>
              </li>
            )
        )}
      </ul>
    </>
  );
};
DecisionsLinks.propTypes = {
  config: PropTypes.object.isRequired,
  filterText: PropTypes.string.isRequired,
};

const DecisionGroup = ({
  decisionConfig,
  themeName,
  themeValues,
  filterText,
}) => {
  const DecisionSample =
    choicesSamplesMap[decisionConfig.prefix] || Samplers.BasicSample;
  const decisions = filterDecisionGroupValues(themeValues, filterText);

  return (
    <GroupStyle isVisible={decisions.length > 0}>
      <a id={getDecisionDetailId(decisionConfig.prefix)} />
      <h3>{decisionConfig.label}</h3>
      <Table>
        <thead>
          <tr>
            <TokenNameHeaderCell>Token</TokenNameHeaderCell>
            <td>Choice</td>
            <td>Value</td>
          </tr>
        </thead>

        <tbody>
          {Object.entries(themeValues).map(([tokenName, decision]) => {
            const choiceValue = choiceValueResolver(decision.choice, themeName);

            return (
              <tr key={tokenName}>
                <td>
                  <>
                    <Token>{tokenName}</Token>
                    <Description>{decision.description}</Description>
                    {getIsDeprecated(tokenName) && <DeprecationBadge />}
                  </>
                </td>
                <td>
                  <Token>{decision.choice}</Token>
                </td>
                <td key={themeName}>
                  {Boolean(choiceValue) && (
                    <>
                      <DecisionSample value={choiceValue} />
                      &nbsp;{choiceValue}
                    </>
                  )}
                  {!Boolean(choiceValue) && <Token>---</Token>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </GroupStyle>
  );
};
DecisionGroup.displayName = 'DecisionGroup';
DecisionGroup.propTypes = {
  filterText: PropTypes.string.isRequired,
  decisionConfig: PropTypes.shape({
    label: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  themeName: PropTypes.string.isRequired,
  themeValues: PropTypes.object.isRequired,
};
DecisionGroup.defaultProps = {
  renderSample: (value) => value,
};

export const DecisionsDetailsList = ({ decisionGroupsByTheme, filterText }) => {
  const { theme } = useTheme();
  const decisionGroups = decisionGroupsByTheme[theme];

  return (
    <>
      {Object.entries(decisionGroups).map(([decisionName, decisionConfig]) => (
        <DecisionGroup
          key={decisionConfig.prefix}
          decisionConfig={decisionConfig}
          themeName={theme}
          themeValues={
            merge({}, decisionGroupsByTheme.default, decisionGroups)[
              decisionName
            ].decisions
          }
          filterText={filterText}
        />
      ))}
    </>
  );
};
DecisionsDetailsList.propTypes = {
  decisionGroupsByTheme: PropTypes.shape({
    default: PropTypes.object,
  }),
  filterText: PropTypes.string.isRequired,
};
