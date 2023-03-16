/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';
import {
  Table,
  TokenNameHeaderCell,
  Token,
  GroupStyle,
  DeprecationBadge,
} from './shared-components';
import { choiceValueResolver, getIsDeprecated } from './utils';
import { getSampleComponent } from './samplers';

const filterDecisionGroupValues = (decisions, filterText) =>
  Object.entries(decisions).filter(([key, decision]) => {
    return (
      key.toLowerCase().includes(filterText.toLowerCase()) ||
      decision.choice.toLowerCase().includes(filterText.toLowerCase())
    );
  });

const TableBody = (props) => {
  return (
    <tbody>
      {props.decisions.map(([tokenName, decision]) => {
        const ChoiceSample = getSampleComponent(props.decisionPrefix);
        const choiceValue =
          choiceValueResolver(decision.choice, props.themeName) || '---';
        return (
          <tr key={`choices-${tokenName}-body-key`}>
            <td>
              <Token>{tokenName}</Token>
              {getIsDeprecated(tokenName) && <DeprecationBadge />}
            </td>
            <td>
              <Token>{decision.choice}</Token>
            </td>
            <td key={`choices-${tokenName}-${props.themeName}-body-key`}>
              <ChoiceSample value={choiceValue} />
              &nbsp;{choiceValue}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
TableBody.propTypes = {
  decisionPrefix: PropTypes.string.isRequired,
  decisions: PropTypes.array.isRequired,
  themeName: PropTypes.string.isRequired,
};

export const DecisionsDetailsList = (props) => {
  return (
    <>
      <h2 id={props.id}>{props.title || upperFirst(props.id)}</h2>
      {props.subtitle && <p>{props.subtitle}</p>}
      {Object.entries(props.decisionGroups).map(
        ([decisionName, decisionConfig]) => {
          const decisions = filterDecisionGroupValues(
            decisionConfig.decisions,
            props.filterText
          );
          return (
            <GroupStyle
              key={`decision-group_${decisionName}`}
              isVisible={decisions.length > 0}
            >
              <a id={`decisions-${decisionConfig.prefix}`} />
              <h3>{decisionConfig.label}</h3>
              {Boolean(decisionConfig.description) && (
                <p>{decisionConfig.description}</p>
              )}
              <Table>
                <thead>
                  <tr>
                    <TokenNameHeaderCell>Token</TokenNameHeaderCell>
                    <td>Choice</td>
                    <td>Value</td>
                  </tr>
                </thead>
                <TableBody
                  decisionPrefix={decisionConfig.prefix}
                  decisions={decisions}
                  themeName={props.themeName}
                />
              </Table>
            </GroupStyle>
          );
        }
      )}
    </>
  );
};
DecisionsDetailsList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  themeName: PropTypes.string.isRequired,
  decisionGroups: PropTypes.object.isRequired,
  filterText: PropTypes.string.isRequired,
};
