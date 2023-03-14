import { Component } from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import TextInput from '@commercetools-uikit/text-input';
import { designTokens } from '@commercetools-uikit/design-system';
import Readme from './TOKENS.md';
import definition from './definition.yaml';
import { ChoicesLinks, ChoicesDetailsList } from './story/choices';
import { StatesLinks, StatesDetailsList } from './story/states';
import {
  ComponentGroupsLinks,
  ComponentGroupsDetailsList,
} from './story/component-groups';
import { VariantsLinks, VariantsDetailsList } from './story/variants';
import { DecisionsLinks, DecisionsDetailsList } from './story/decisions';

const choiceGroupsByTheme =
  process.env.NODE_ENV !== 'production'
    ? definition.choiceGroupsByTheme
    : { default: definition.choiceGroupsByTheme.default };

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  font-family: ${designTokens.fontFamilyDefault};
  color: ${designTokens.colorSolid}
  margin: 10px;
  > * + * {
    margin: 16px 0 0 0;
  }
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
            <StatesLinks />
          </li>
          <li>
            <ComponentGroupsLinks />
          </li>
          <li>
            <VariantsLinks />
          </li>
          <li>
            <DecisionsLinks
              config={definition.decisionGroupsByTheme.default}
              filterText={this.state.searchText}
            />
          </li>
        </ul>

        <h2 id="choices">Choices</h2>
        <p>
          This is the palette of values you may chose from when creating design
          tokens.
        </p>
        <ChoicesDetailsList choiceGroupsByTheme={choiceGroupsByTheme} />

        <h2 id="states">States</h2>
        <StatesDetailsList
          states={definition.states}
          searchText={this.state.searchText}
        />

        <h2 id="component-groups">Component Groups</h2>
        <ComponentGroupsDetailsList
          states={definition.componentGroups}
          searchText={this.state.searchText}
        />

        <h2 id="variants">Variants</h2>
        <VariantsDetailsList
          variants={definition.variants}
          searchText={this.state.searchText}
        />

        <h2 id="decisions">Decisions</h2>
        <p>
          These are specific decisions where a choice gets applied to an element
          (optionally in a certain state).
        </p>
        <DecisionsDetailsList
          decisionGroupsByTheme={definition.decisionGroupsByTheme}
          filterText={this.state.searchText}
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
