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

const filterChoicesValues = (choices, filterText) =>
  Object.keys(choices).filter((key) =>
    key.toLowerCase().includes(filterText.toLowerCase())
  );

const TableBody = (props) => {
  return (
    <tbody>
      {props.choices.map((tokenName) => {
        const ChoiceSample = getSampleComponent(props.choicePrefix);
        const choiceValue = choiceValueResolver(tokenName, props.themeName);
        return (
          <tr key={`choices-${tokenName}-body-key`}>
            <td>
              <Token>{tokenName}</Token>
              {getIsDeprecated(tokenName) && <DeprecationBadge />}
            </td>
            <td>
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
  choicePrefix: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  themeName: PropTypes.string.isRequired,
};

export const ChoicesDetailsList = (props) => {
  return (
    <>
      <h2 id={props.id}>{props.title || upperFirst(props.id)}</h2>
      {props.subtitle && <p>{props.subtitle}</p>}
      {Object.entries(props.choiceGroups).map(([choiceName, choiceConfig]) => {
        const choices = filterChoicesValues(
          choiceConfig.choices,
          props.filterText
        );
        return (
          <GroupStyle
            key={`choice-group_${choiceName}`}
            isVisible={choices.length > 0}
          >
            <a id={`choices-${choiceConfig.prefix}`} />
            <h3>{choiceConfig.label}</h3>
            {Boolean(choiceConfig.description) && (
              <p>{choiceConfig.description}</p>
            )}
            <Table>
              <thead>
                <tr>
                  <TokenNameHeaderCell>Token</TokenNameHeaderCell>
                  <td>Value</td>
                </tr>
              </thead>
              <TableBody
                choicePrefix={choiceConfig.prefix}
                choices={choices}
                themeName={props.themeName}
              />
            </Table>
          </GroupStyle>
        );
      })}
    </>
  );
};
ChoicesDetailsList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  themeName: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired,
  choiceGroups: PropTypes.object.isRequired,
};
