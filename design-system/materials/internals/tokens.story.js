import { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import TextInput from '@commercetools-uikit/text-input';
import merge from 'lodash/merge';
import { designTokens } from '@commercetools-uikit/design-system';
import Readme from './TOKENS.md';
import definition from './definition.yaml';
import deprecatedTokens from './deprecated-tokens';
import { ChoicesDetailsList, ChoicesLinks } from './story/choices';

const choiceGroupsByTheme =
  process.env.NODE_ENV !== 'production'
    ? definition.choiceGroupsByTheme
    : { default: definition.choiceGroupsByTheme.default };
const allThemesNames = Object.keys(choiceGroupsByTheme);

const getIsDeprecated = (token) => deprecatedTokens.includes(token);

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
  font-family: ${designTokens.fontFamilyDefault};
  color: ${designTokens.colorSolid}
  margin: 10px;
  > * + * {
    margin: 16px 0 0 0;
  }
`;

const GroupStyle = styled.div`
  padding: 10px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
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

const getThemeChoiceByName = (theme, choiceName) => {
  return Object.values(theme)
    .map((choiceGroup) => choiceGroup.choices)
    .find((choices) => choices[choiceName]);
};

const getChoiceValue = (choiceName, theme) => {
  const defaultChoice = getThemeChoiceByName(
    choiceGroupsByTheme.default,
    choiceName
  );

  const themeChoice = getThemeChoiceByName(
    choiceGroupsByTheme[theme],
    choiceName
  );

  return defaultChoice
    ? themeChoice?.[choiceName] ?? defaultChoice[choiceName]
    : undefined;
};

const filterChoiceGroupValues = (choices, searchText) =>
  Object.entries(choices).filter(
    ([key, value]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      value.toLowerCase().includes(searchText.toLowerCase())
  );

const filterDecisionGroupValues = (decisions, searchText, theme) =>
  Object.entries(decisions).filter(([key, decision]) => {
    return (
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      decision.choice.toLowerCase().includes(searchText.toLowerCase()) ||
      (getChoiceValue(decision.choice, theme) || '')
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  });

const filterStatesGroupValues = (states, searchText) =>
  Object.entries(states).filter(
    ([key, state]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      (state.description &&
        state.description.toLowerCase().includes(searchText.toLowerCase()))
  );

const filterComponentGroupsGroupValues = (componentGroups, searchText) =>
  Object.entries(componentGroups).filter(
    ([key, state]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      (state.description &&
        state.description.toLowerCase().includes(searchText.toLowerCase()))
  );

const filterVariantsGroupValues = (variants, searchText) =>
  Object.entries(variants).filter(
    ([key, state]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      (state.description &&
        state.description.toLowerCase().includes(searchText.toLowerCase()))
  );

const getDefaultThemeChoiceGroupProperty = (choiceGroup, property) =>
  choiceGroupsByTheme.default[choiceGroup][property];

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
      <a
        id={`choice-${getDefaultThemeChoiceGroupProperty(
          props.choiceGroup,
          'prefix'
        )}`}
      />
      <h3>{getDefaultThemeChoiceGroupProperty(props.choiceGroup, 'label')}</h3>
      {getDefaultThemeChoiceGroupProperty(props.choiceGroup, 'description') && (
        <p>
          {getDefaultThemeChoiceGroupProperty(props.choiceGroup, 'description')}
        </p>
      )}
      <Table>
        <thead>
          <tr>
            <TokenRow>Token</TokenRow>
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

const DecisionGroup = (props) => {
  const decisions = filterDecisionGroupValues(
    props.decisionGroup.decisions,
    props.searchText,
    allThemesNames[0]
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
            {allThemesNames.map((theme) => {
              return <td key={theme}>{theme}</td>;
            })}
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
              {allThemesNames.map((theme) => {
                return (
                  <td key={theme}>
                    {props.renderSample(
                      getChoiceValue(decision.choice, theme),
                      name
                    )}
                  </td>
                );
              })}
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
    decisions: PropTypes.shape({
      choice: PropTypes.string,
      description: PropTypes.string,
    }),
  }).isRequired,
  renderSample: PropTypes.func.isRequired,
};
DecisionGroup.defaultProps = {
  renderSample: (value) => value,
};

const StatesGroup = (props) => {
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
    description: PropTypes.string,
  }).isRequired,
};

const ComponentGroupsGroup = (props) => {
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

const VariantsGroup = (props) => {
  const variants = filterVariantsGroupValues(props.states, props.searchText);
  return (
    <GroupStyle isVisible={variants.length > 0}>
      <Table>
        <thead>
          <tr>
            <TokenRow>State</TokenRow>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          {variants.map(([name, variant]) => (
            <tr key={name}>
              <td>
                <Token>{name}</Token>
                {variant.deprecated && <DeprecationBadge />}
              </td>
              <td>{variant.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </GroupStyle>
  );
};
VariantsGroup.displayName = 'VariantsGroup';
VariantsGroup.propTypes = {
  searchText: PropTypes.string.isRequired,
  states: PropTypes.shape({
    decisions: PropTypes.objectOf(PropTypes.string),
    description: PropTypes.string,
  }).isRequired,
};

const ColorSample = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.1);
  display: inline-block;
`;

const FontColorSampleStyle = styled.div`
  color: ${(props) => props.color};
  font-size: 24pt;
  font-weight: bolder;
  display: inline-block;
`;

const FontColorSample = (props) => (
  <FontColorSampleStyle {...props}>Aa</FontColorSampleStyle>
);
FontColorSample.displayName = 'FontColorSample';

const BorderRadiusSample = styled.div`
  width: calc(
    ${(props) => props.borderRadius} + 2 * ${(props) => props.borderRadius}
  );
  min-width: 20px;
  height: calc(
    ${(props) => props.borderRadius} + 2 * ${(props) => props.borderRadius}
  );
  min-height: 20px;
  background-color: pink;
  border-radius: ${(props) => props.borderRadius};
  display: inline-block;
  margin: 0 10px;
`;

const ShadowSample = styled.div`
  width: 50px;
  height: 50px;
  box-shadow: ${(props) => props.shadow};
  display: inline-block;
  margin: 0 10px;
`;

const SpacingSample = styled.div`
  width: ${(props) => props.spacing};
  height: ${(props) => props.spacing};
  background-color: lightblue;
  display: inline-block;
  margin: 0 10px;
`;

class Story extends Component {
  static displayName = 'Story';

  state = {
    searchText: '',
  };

  searchTextChangeHandler = (event) => {
    this.setState({ searchText: event.target.value });
  };

  render() {
    return (
      <Background>
        <TextInput
          value={this.state.searchText}
          onChange={this.searchTextChangeHandler}
          horizontalConstraint="m"
        />
        <h2>Table of Contents</h2>
        <ul>
          <li>
            <ChoicesLinks
              config={choiceGroupsByTheme.default}
              filterText={this.state.searchText}
            />
          </li>
          <li>
            <a
              href="#states"
              onClick={(event) => {
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
              onClick={(event) => {
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
            <a
              href="#variants"
              onClick={(event) => {
                event.preventDefault();
                window.scrollTo(
                  0,
                  document.getElementById('variants').offsetTop
                );
              }}
            >
              Variants
            </a>
          </li>
          <li>
            {' '}
            <a
              href="#decisions"
              onClick={(event) => {
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
              {Object.entries(definition.decisionGroupsByTheme.default).map(
                ([key, decisionGroup]) =>
                  filterDecisionGroupValues(
                    decisionGroup.decisions,
                    this.state.searchText,
                    allThemesNames[0]
                  ).length > 0 && (
                    <li key={key}>
                      <a
                        href={`#${decisionGroup.prefix}`}
                        onClick={(event) => {
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
        <ChoicesDetailsList choiceGroupsByTheme={choiceGroupsByTheme} />
        <ChoiceGroup
          choiceGroup="colors"
          searchText={this.state.searchText}
          renderSample={(value) => (
            <>
              <ColorSample color={value} /> {value}
            </>
          )}
        />
        <ChoiceGroup
          choiceGroup="borderRadiuses"
          searchText={this.state.searchText}
          renderSample={(value) => (
            <>
              <BorderRadiusSample borderRadius={value} /> {value}
            </>
          )}
        />
        <ChoiceGroup
          choiceGroup="shadows"
          searchText={this.state.searchText}
          renderSample={(value) => (
            <>
              <ShadowSample shadow={value} /> {value}
            </>
          )}
        />
        <ChoiceGroup
          choiceGroup="constraints"
          searchText={this.state.searchText}
        />
        <ChoiceGroup
          choiceGroup="spacings"
          searchText={this.state.searchText}
          renderSample={(value) => (
            <>
              <SpacingSample spacing={value} /> {value}
            </>
          )}
        />
        <ChoiceGroup
          choiceGroup="transitions"
          searchText={this.state.searchText}
        />
        <ChoiceGroup
          choiceGroup="breakpoints"
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

        <h2 id="variants">Variants</h2>
        <VariantsGroup
          states={definition.variants}
          searchText={this.state.searchText}
        />

        <h2 id="decisions">Decisions</h2>
        <p>
          These are specific decisions where a choice gets applied to an element
          (optionally in a certain state).
        </p>
        <DecisionGroup
          theme={definition.decisionGroupsByTheme.default}
          decisionGroup={
            definition.decisionGroupsByTheme.default.backgroundColors
          }
          searchText={this.state.searchText}
          renderSample={(value) => (
            <>
              <ColorSample color={value} /> {value}
            </>
          )}
        />
        <DecisionGroup
          theme={definition.decisionGroupsByTheme.default}
          decisionGroup={definition.decisionGroupsByTheme.default.borderColors}
          searchText={this.state.searchText}
          renderSample={(value) => (
            <>
              <ColorSample color={value} /> {value}
            </>
          )}
        />
        <DecisionGroup
          theme={definition.decisionGroupsByTheme.default}
          decisionGroup={
            definition.decisionGroupsByTheme.default.borderRadiuses
          }
          searchText={this.state.searchText}
          renderSample={(value) => (
            <>
              <BorderRadiusSample borderRadius={value} /> {value}
            </>
          )}
        />
        <DecisionGroup
          theme={definition.decisionGroupsByTheme.default}
          decisionGroup={definition.decisionGroupsByTheme.default.fontColors}
          searchText={this.state.searchText}
          renderSample={(value) => (
            <>
              <FontColorSample color={value} /> {value}
            </>
          )}
        />
        <DecisionGroup
          theme={definition.decisionGroupsByTheme.default}
          decisionGroup={definition.decisionGroupsByTheme.default.shadows}
          searchText={this.state.searchText}
          renderSample={(value) => (
            <>
              <ShadowSample shadow={value} /> {value}
            </>
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
