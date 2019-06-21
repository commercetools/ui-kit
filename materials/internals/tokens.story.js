import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import Readme from './TOKENS.md';
import TextInput from '../../src/components/inputs/text-input';
import vars from '../custom-properties';
import definition from './definition.yaml';

const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  & tr td {
    border: 1px solid #ccc;
    padding: 15px;
    text-align: left;
  }
  & thead td {
    background-color: gray;
    color: white;
    font-weight: bold;
  }
`;

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  font-family: ${vars.fontFamilyDefault};
  color: ${vars.colorBlack};
  margin: 10px;
  > * + * {
    margin: 16px 0 0 0;
  }
`;

const GroupStyle = styled.div`
  padding: 10px;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

const Token = styled.p`
  font-family: monospace;
`;

const TokenRow = styled.td`
  min-width: 400px;
`;

const Description = styled.p`
  font-size: 10pt;
  margin: 10px 0;
`;

const DeprecationBadge = () => <b style={{ color: 'orange' }}>DEPRECATED</b>;
DeprecationBadge.displayName = 'DeprecationBadge';

const getChoiceValue = choiceName => {
  const choice = Object.values(definition.choiceGroups)
    .map(choiceGroup => choiceGroup.choices)
    .find(choices => choices[choiceName]);
  if (!choice)
    throw new Error(`Tried to get value of non-existant choice ${choiceName}`);
  return choice ? choice[choiceName] : undefined;
};

const filterChoiceGroupValues = (choices, searchText) =>
  Object.entries(choices).filter(
    ([key, value]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      value.toLowerCase().includes(searchText.toLowerCase())
  );

const filterDecisionGroupValues = (decisions, searchText) =>
  Object.entries(decisions).filter(
    ([key, decision]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      decision.choice.toLowerCase().includes(searchText.toLowerCase()) ||
      getChoiceValue(decision.choice)
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );

const filterStatesGroupValues = (states, searchText) =>
  Object.entries(states).filter(
    ([key, state]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      state.description.toLowerCase().includes(searchText.toLowerCase())
  );

const filterComponentGroupsGroupValues = (componentGroups, searchText) =>
  Object.entries(componentGroups).filter(
    ([key, state]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      state.description.toLowerCase().includes(searchText.toLowerCase())
  );

const ChoiceGroup = props => {
  const choices = filterChoiceGroupValues(
    props.choiceGroup.choices,
    props.searchText
  );
  return (
    <GroupStyle isVisible={choices.length > 0}>
      <a id={`choice-${props.choiceGroup.prefix}`} />
      <h3>{props.choiceGroup.label}</h3>
      {props.choiceGroup.description && <p>{props.choiceGroup.description}</p>}
      <Table>
        <thead>
          <tr>
            <TokenRow>Token</TokenRow>
            <td>Example</td>
          </tr>
        </thead>
        <tbody>
          {choices.map(([name, value]) => (
            <tr key={name}>
              <td>
                <Token>{name}</Token>
              </td>
              <td>{props.renderSample(value, name)}</td>
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
  renderSample: value => value,
};

const DecisionGroup = props => {
  const decisions = filterDecisionGroupValues(
    props.decisionGroup.decisions,
    props.searchText
  );
  return (
    <GroupStyle isVisible={decisions.length > 0}>
      <a id={`decision-${props.decisionGroup.prefix}`} />
      <h3>{props.decisionGroup.label}</h3>
      <Table>
        <thead>
          <tr>
            <TokenRow>Token</TokenRow>
            <td>Choice</td>
            <td>Example</td>
          </tr>
        </thead>
        <tbody>
          {decisions.map(([name, decision]) => (
            <tr key={name}>
              <td>
                <Token>{name}</Token>
                <Description>{decision.description}</Description>
                {decision.deprecated && <DeprecationBadge />}
              </td>
              <td>
                <Token>{decision.choice}</Token>
              </td>
              <td>
                {props.renderSample(getChoiceValue(decision.choice), name)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </GroupStyle>
  );
};
DecisionGroup.displayName = 'DecisionGroup';
DecisionGroup.propTypes = {
  searchText: PropTypes.string.isRequired,
  decisionGroup: PropTypes.shape({
    label: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    decisions: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  renderSample: PropTypes.func.isRequired,
};
DecisionGroup.defaultProps = {
  renderSample: value => value,
};

const StatesGroup = props => {
  const states = filterStatesGroupValues(props.states, props.searchText);
  return (
    <GroupStyle isVisible={states.length > 0}>
      <Table>
        <thead>
          <tr>
            <TokenRow>State</TokenRow>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          {states.map(([name, state]) => (
            <tr key={name}>
              <td>
                <Token>{name}</Token>
                {state.deprecated && <DeprecationBadge />}
              </td>
              <td>{state.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </GroupStyle>
  );
};
StatesGroup.displayName = 'StatesGroup';
StatesGroup.propTypes = {
  searchText: PropTypes.string.isRequired,
  states: PropTypes.shape({
    decisions: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

const ComponentGroupsGroup = props => {
  const componentGroups = filterComponentGroupsGroupValues(
    props.states,
    props.searchText
  );
  return (
    <GroupStyle isVisible={componentGroups.length > 0}>
      <Table>
        <thead>
          <tr>
            <TokenRow>State</TokenRow>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          {componentGroups.map(([name, componentGroup]) => (
            <tr key={name}>
              <td>
                <Token>{name}</Token>
                {componentGroup.deprecated && <DeprecationBadge />}
              </td>
              <td>{componentGroup.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </GroupStyle>
  );
};
ComponentGroupsGroup.displayName = 'ComponentGroupsGroup';
ComponentGroupsGroup.propTypes = {
  searchText: PropTypes.string.isRequired,
  states: PropTypes.shape({
    decisions: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

const ColorSample = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color};
  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.1);
  display: inline-block;
`;

const FontColorSampleStyle = styled.div`
  color: ${props => props.color};
  font-size: 24pt;
  font-weight: bolder;
  display: inline-block;
`;

const FontColorSample = props => (
  <FontColorSampleStyle {...props}>Aa</FontColorSampleStyle>
);
FontColorSample.displayName = 'FontColorSample';

const BorderRadiusSample = styled.div`
  width: calc(
    ${props => props.borderRadius} + 2 * ${props => props.borderRadius}
  );
  min-width: 20px;
  height: calc(
    ${props => props.borderRadius} + 2 * ${props => props.borderRadius}
  );
  min-height: 20px;
  background-color: pink;
  border-radius: ${props => props.borderRadius};
  display: inline-block;
  margin: 0 10px;
`;

const ShadowSample = styled.div`
  width: 50px;
  height: 50px;
  box-shadow: ${props => props.shadow};
  display: inline-block;
  margin: 0 10px;
`;

const SpacingSample = styled.div`
  width: ${props => props.spacing};
  height: ${props => props.spacing};
  background-color: lightblue;
  display: inline-block;
  margin: 0 10px;
`;

class Story extends React.Component {
  static displayName = 'Story';

  state = {
    searchText: '',
  };

  render() {
    return (
      <Background>
        <TextInput
          value={this.state.searchText}
          onChange={event => {
            this.setState({ searchText: event.target.value });
          }}
          horizontalConstraint="m"
        />
        <h2>Table of Contents</h2>
        <ul>
          <li>
            <a
              href="#choices"
              onClick={event => {
                event.preventDefault();
                window.scrollTo(
                  0,
                  document.getElementById('choices').offsetTop
                );
              }}
            >
              Choices
            </a>
            <ul>
              {Object.entries(definition.choiceGroups).map(
                ([key, choiceGroup]) =>
                  filterChoiceGroupValues(
                    choiceGroup.choices,
                    this.state.searchText
                  ).length > 0 && (
                    <li key={key}>
                      <a
                        href={`#${choiceGroup.prefix}`}
                        onClick={event => {
                          event.preventDefault();
                          window.scrollTo(
                            0,
                            document.getElementById(
                              `choice-${choiceGroup.prefix}`
                            ).offsetTop
                          );
                        }}
                      >
                        {choiceGroup.label}
                      </a>
                    </li>
                  )
              )}
            </ul>
          </li>
          <li>
            <a
              href="#states"
              onClick={event => {
                event.preventDefault();
                window.scrollTo(0, document.getElementById('states').offsetTop);
              }}
            >
              States
            </a>
          </li>
          <li>
            <a
              href="#component-groups"
              onClick={event => {
                event.preventDefault();
                window.scrollTo(
                  0,
                  document.getElementById('component-groups').offsetTop
                );
              }}
            >
              Component Groups
            </a>
          </li>
          <li>
            {' '}
            <a
              href="#decisions"
              onClick={event => {
                event.preventDefault();
                window.scrollTo(
                  0,
                  document.getElementById('decisions').offsetTop
                );
              }}
            >
              Decisions
            </a>{' '}
            <ul>
              {Object.entries(definition.decisionGroups).map(
                ([key, decisionGroup]) =>
                  filterDecisionGroupValues(
                    decisionGroup.decisions,
                    this.state.searchText
                  ).length > 0 && (
                    <li key={key}>
                      <a
                        href={`#${decisionGroup.prefix}`}
                        onClick={event => {
                          event.preventDefault();
                          window.scrollTo(
                            0,
                            document.getElementById(
                              `decision-${decisionGroup.prefix}`
                            ).offsetTop
                          );
                        }}
                      >
                        {decisionGroup.label}
                      </a>
                    </li>
                  )
              )}
            </ul>
          </li>
        </ul>

        <h2 id="choices">Choices</h2>
        <p>
          This is the palette of values you may chose from when creating design
          tokens.
        </p>
        <ChoiceGroup
          choiceGroup={definition.choiceGroups.colors}
          searchText={this.state.searchText}
          renderSample={value => (
            <React.Fragment>
              <ColorSample color={value} /> {value}
            </React.Fragment>
          )}
        />
        <ChoiceGroup
          choiceGroup={definition.choiceGroups.borderRadiuses}
          searchText={this.state.searchText}
          renderSample={value => (
            <React.Fragment>
              <BorderRadiusSample borderRadius={value} /> {value}
            </React.Fragment>
          )}
        />
        <ChoiceGroup
          choiceGroup={definition.choiceGroups.shadows}
          searchText={this.state.searchText}
          renderSample={value => (
            <React.Fragment>
              <ShadowSample shadow={value} /> {value}
            </React.Fragment>
          )}
        />
        <ChoiceGroup
          choiceGroup={definition.choiceGroups.constraints}
          searchText={this.state.searchText}
        />
        <ChoiceGroup
          choiceGroup={definition.choiceGroups.spacings}
          searchText={this.state.searchText}
          renderSample={value => (
            <React.Fragment>
              <SpacingSample spacing={value} /> {value}
            </React.Fragment>
          )}
        />
        <ChoiceGroup
          choiceGroup={definition.choiceGroups.transitions}
          searchText={this.state.searchText}
        />
        <ChoiceGroup
          choiceGroup={definition.choiceGroups.breakpoints}
          searchText={this.state.searchText}
        />

        <h2 id="states">States</h2>
        <StatesGroup
          states={definition.states}
          searchText={this.state.searchText}
        />

        <h2 id="component-groups">Component Groups</h2>
        <ComponentGroupsGroup
          states={definition.componentGroups}
          searchText={this.state.searchText}
        />

        <h2 id="decisions">Decisions</h2>
        <p>
          These are specific decisions where a choice gets applied to an element
          (optionally in a certain state).
        </p>
        <DecisionGroup
          decisionGroup={definition.decisionGroups.backgroundColors}
          searchText={this.state.searchText}
          renderSample={value => (
            <React.Fragment>
              <ColorSample color={value} /> {value}
            </React.Fragment>
          )}
        />
        <DecisionGroup
          decisionGroup={definition.decisionGroups.borderColors}
          searchText={this.state.searchText}
          renderSample={value => (
            <React.Fragment>
              <ColorSample color={value} /> {value}
            </React.Fragment>
          )}
        />
        <DecisionGroup
          decisionGroup={definition.decisionGroups.borderRadiuses}
          searchText={this.state.searchText}
          renderSample={value => (
            <React.Fragment>
              <BorderRadiusSample borderRadius={value} /> {value}
            </React.Fragment>
          )}
        />
        <DecisionGroup
          decisionGroup={definition.decisionGroups.fontColors}
          searchText={this.state.searchText}
          renderSample={value => (
            <React.Fragment>
              <FontColorSample color={value} /> {value}
            </React.Fragment>
          )}
        />
        <DecisionGroup
          decisionGroup={definition.decisionGroups.shadows}
          searchText={this.state.searchText}
          renderSample={value => (
            <React.Fragment>
              <ShadowSample shadow={value} /> {value}
            </React.Fragment>
          )}
        />
      </Background>
    );
  }
}

storiesOf('Basics|Tokens', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('All Tokens', () => <Story />);
