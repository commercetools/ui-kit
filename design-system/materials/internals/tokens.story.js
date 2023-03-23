/* eslint-disable default-case */
import { useCallback, useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import merge from 'lodash/merge';
import TextInput from '@commercetools-uikit/text-input';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';
import Readme from './TOKENS.md';
import definition from './definition.yaml';
import {
  MultiTokensGroupDetails,
  Token,
  TokenBodyCell,
  TokenGroupLinks,
  SingleTokensGroupDetails,
} from './story/shared-components';
import { getSampleComponent } from './story/samplers';

const findChoiceValue = (theme, choiceName) => {
  return Object.values(theme)
    .map((choiceGroup) => choiceGroup.choices)
    .find((choices) => choices[choiceName])?.[choiceName];
};

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  font-family: ${designTokens.fontFamilyDefault};
  color: ${designTokens.colorSolid}
  margin: 10px;
  > * + * {
    margin: 16px 0 0 0;
  }
`;

const DetailsGroupsContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const BasicCellRenderer = (cellData) => {
  if (cellData.columnKey !== 'description') {
    return <TokenBodyCell tokenName={cellData.tokenName} />;
  } else {
    return cellData.tokenData.description;
  }
};

function Story() {
  const [filterText, setFilterText] = useState('');
  const { theme } = useTheme();
  const currentThemeChoices = useMemo(() => {
    return merge(
      {},
      definition.choiceGroupsByTheme.default,
      definition.choiceGroupsByTheme[theme]
    );
  }, [theme]);
  const currentThemeDecisions = useMemo(
    () =>
      merge(
        {},
        definition.decisionGroupsByTheme.default,
        definition.decisionGroupsByTheme[theme]
      ),
    [theme]
  );

  const searchTextChangeHandler = useCallback((event) => {
    setFilterText(event.target.value);
  }, []);

  return (
    <Background>
      <header>
        <TextInput
          value={filterText}
          onChange={searchTextChangeHandler}
          horizontalConstraint={13}
        />
        <h2>Table of Contents</h2>
        <ul>
          <li>
            <TokenGroupLinks
              id="choices"
              config={currentThemeChoices}
              filterText={filterText}
            >
              Choices
            </TokenGroupLinks>
          </li>
          <li>
            <TokenGroupLinks id="states">States</TokenGroupLinks>
          </li>
          <li>
            <TokenGroupLinks id="component-groups">
              Component Groups
            </TokenGroupLinks>
          </li>
          <li>
            <TokenGroupLinks id="variants">Variants</TokenGroupLinks>
          </li>
          <li>
            <TokenGroupLinks
              id="decisions"
              config={currentThemeDecisions}
              filterText={filterText}
            >
              Decisions
            </TokenGroupLinks>
          </li>
        </ul>
      </header>

      <DetailsGroupsContainer>
        <MultiTokensGroupDetails
          id="choices"
          subtitle="This is the palette of values you may chose from when creating design tokens."
          themeName={theme}
          filterText={filterText}
          columnsConfig={[{ key: 'token' }, { key: 'value' }]}
          cellRenderer={(data) => {
            if (data.columnKey === 'token') {
              return <Token>{data.tokenName}</Token>;
            } else {
              const ChoiceSample = getSampleComponent(data.groupItemsPrefix);
              return (
                <>
                  <ChoiceSample value={data.tokenData} />
                  &nbsp;{data.tokenData}
                </>
              );
            }
          }}
          tokensGroupData={currentThemeChoices}
        />

        <SingleTokensGroupDetails
          id="states"
          columnsConfig={[{ key: 'state' }, { key: 'description' }]}
          cellRenderer={BasicCellRenderer}
          groupItems={definition.states}
          themeName={theme}
          filterText={filterText}
        />

        <SingleTokensGroupDetails
          id="component-groups"
          title="Component Groups"
          columnsConfig={[
            { key: 'component-group', label: 'Component Group' },
            { key: 'description' },
          ]}
          cellRenderer={BasicCellRenderer}
          groupItems={definition.componentGroups}
          themeName={theme}
          filterText={filterText}
        />

        <SingleTokensGroupDetails
          id="variants"
          columnsConfig={[{ key: 'variant' }, { key: 'description' }]}
          cellRenderer={BasicCellRenderer}
          groupItems={definition.variants}
          themeName={theme}
          filterText={filterText}
        />

        <MultiTokensGroupDetails
          id="decisions"
          subtitle="These are specific decisions where a choice gets applied to an element (optionally in a certain state)."
          themeName={theme}
          filterText={filterText}
          columnsConfig={[
            { key: 'token' },
            { key: 'choice' },
            { key: 'value' },
          ]}
          cellRenderer={(data) => {
            switch (data.columnKey) {
              case 'token':
                return <Token>{data.tokenName}</Token>;
              case 'choice':
                return <Token>{data.tokenData.choice}</Token>;
              case 'value':
                const ChoiceSample = getSampleComponent(data.groupItemsPrefix);
                const choiceValue = findChoiceValue(
                  currentThemeChoices,
                  data.tokenData.choice
                );
                if (choiceValue) {
                  return (
                    <>
                      <ChoiceSample value={choiceValue} />
                      &nbsp;{choiceValue}
                    </>
                  );
                } else {
                  return <Token>---</Token>;
                }
              default:
                return null;
            }
          }}
          tokensGroupData={currentThemeDecisions}
        />
      </DetailsGroupsContainer>
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
