/* eslint-disable default-case */
import { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import TextInput from '@commercetools-uikit/text-input';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';
import Readme from './TOKENS.md';
import definition from './definition.yaml';
import {
  GroupLinks,
  GroupItemsDetailedList,
  TokenBodyCell,
} from './story/shared-components';
import { ChoicesDetailsList } from './story/choices';
import { DecisionsDetailsList } from './story/decisions';

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

function Story() {
  const [filterText, setFilterText] = useState('');
  const { theme } = useTheme();

  const searchTextChangeHandler = useCallback((event) => {
    setFilterText(event.target.value);
  }, []);

  return (
    <Background>
      <TextInput
        value={filterText}
        onChange={searchTextChangeHandler}
        horizontalConstraint="13"
      />
      <h2>Table of Contents</h2>
      <ul>
        <li>
          <GroupLinks
            id="choices"
            config={choiceGroupsByTheme.default}
            filterText={filterText}
          >
            Choices
          </GroupLinks>
        </li>
        <li>
          <GroupLinks id="states">States</GroupLinks>
        </li>
        <li>
          <GroupLinks id="component-groups">Component Groups</GroupLinks>
        </li>
        <li>
          <GroupLinks id="variants">Variants</GroupLinks>
        </li>
        <li>
          <GroupLinks
            id="decisions"
            config={definition.decisionGroupsByTheme.default}
            filterText={filterText}
          >
            Decisions
          </GroupLinks>
        </li>
      </ul>

      <ChoicesDetailsList
        id="choices"
        subtitle="This is the palette of values you may chose from when creating design tokens."
        themeName={theme}
        choiceGroups={definition.choiceGroupsByTheme[theme]}
        filterText={filterText}
      />

      <GroupItemsDetailedList
        id="states"
        columnsConfig={[{ key: 'state' }, { key: 'description' }]}
        cellRenderer={(data) => {
          switch (data.columnKey) {
            case 'state':
              return <TokenBodyCell tokenName={data.tokenName} />;
            case 'description':
              return data.tokenData.description;
          }
        }}
        groupItems={definition.states}
        themeName={theme}
        searchText={filterText}
      />

      <GroupItemsDetailedList
        id="component-groups"
        title="Component Groups"
        columnsConfig={[
          { key: 'component-group', label: 'Component Group' },
          { key: 'description' },
        ]}
        cellRenderer={(data) => {
          switch (data.columnKey) {
            case 'component-group':
              return <TokenBodyCell tokenName={data.tokenName} />;
            case 'description':
              return data.tokenData.description;
          }
        }}
        groupItems={definition.componentGroups}
        themeName={theme}
        searchText={filterText}
      />

      <GroupItemsDetailedList
        id="variants"
        columnsConfig={[{ key: 'variant' }, { key: 'description' }]}
        cellRenderer={(data) => {
          switch (data.columnKey) {
            case 'variant':
              return <TokenBodyCell tokenName={data.tokenName} />;
            case 'description':
              return data.tokenData.description;
          }
        }}
        groupItems={definition.variants}
        themeName={theme}
        searchText={filterText}
      />

      <DecisionsDetailsList
        id="decisions"
        subtitle="These are specific decisions where a choice gets applied to an element (optionally in a certain state)."
        themeName={theme}
        decisionGroups={definition.decisionGroupsByTheme[theme]}
        filterText={filterText}
      />
    </Background>
  );
}

storiesOf('Basics|Tokens', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('All Tokens', () => <Story />);
