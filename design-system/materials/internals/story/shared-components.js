/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';
import deprecatedTokens from '../deprecated-tokens';

const getIsDeprecated = (token) => deprecatedTokens.includes(token);

const filterGroupItemsValues = (groupItems, searchText) =>
  Object.entries(groupItems).filter(
    ([key, value]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      value?.toLowerCase?.().includes(searchText.toLowerCase()) ||
      value?.description?.toLowerCase().includes(searchText.toLowerCase())
  );

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

const GroupStyle = styled.div`
  padding: 10px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

export const Token = styled.p`
  font-family: monospace;
`;

const DeprecationBadge = () => <b style={{ color: 'orange' }}>DEPRECATED</b>;
DeprecationBadge.displayName = 'DeprecationBadge';

export const TokenBodyCell = (props) => (
  <>
    <Token>{props.tokenName}</Token>
    {getIsDeprecated(props.tokenName) && <DeprecationBadge />}
  </>
);
TokenBodyCell.propTypes = {
  tokenName: PropTypes.string.isRequired,
};

export const TokenGroupLinks = (props) => {
  return (
    <>
      <a
        href={`#${props.id}`}
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({
            top: document.getElementById(props.id).offsetTop,
            behavior: 'smooth',
          });
        }}
      >
        {props.children}
      </a>
      {Boolean(props.config) && (
        <ul>
          {Object.entries(props.config).map(
            ([key, configGroup]) =>
              filterGroupItemsValues(
                configGroup.choices || configGroup.decisions,
                props.filterText
              ).length > 0 && (
                <li key={key}>
                  <a
                    href={`#${props.id}-${configGroup.prefix}`}
                    onClick={(event) => {
                      event.preventDefault();
                      window.scrollTo({
                        top: document.getElementById(
                          `${props.id}-${configGroup.prefix}`
                        ).offsetTop,
                        behavior: 'smooth',
                      });
                    }}
                  >
                    {configGroup.label}
                  </a>
                </li>
              )
          )}
        </ul>
      )}
    </>
  );
};
TokenGroupLinks.propTypes = {
  id: PropTypes.string.isRequired,
  config: PropTypes.object,
  filterText: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const TableBody = (props) => {
  return (
    <tbody>
      {props.groupItems.map(([tokenName, tokenData]) => {
        return (
          <tr key={`${props.groupItemsPrefix}-${tokenName}-body-row-key`}>
            {props.columnsConfig.map((columnConfig) => (
              <td
                key={`${props.groupItemsPrefix}-${tokenName}-${columnConfig.key}-body-cell-key`}
              >
                {props.cellRenderer({
                  columnKey: columnConfig.key,
                  groupItemsPrefix: props.groupItemsPrefix,
                  tokenName,
                  tokenData,
                  themeName: props.themeName,
                })}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};
TableBody.propTypes = {
  groupItems: PropTypes.array.isRequired,
  groupItemsPrefix: PropTypes.string,
  themeName: PropTypes.string.isRequired,
  columnsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  cellRenderer: PropTypes.func.isRequired,
};

const TokensDetailsTable = (props) => (
  <Table>
    <thead>
      <tr>
        {props.columnsConfig.map((columnsConfig, index) => (
          <td
            key={columnsConfig.key}
            style={{
              minWidth: index === 0 ? 400 : 'auto',
            }}
          >
            {columnsConfig.label || upperFirst(columnsConfig.key)}
          </td>
        ))}
      </tr>
    </thead>
    <TableBody
      groupItems={props.tokensGroupData}
      groupItemsPrefix={props.tokensGroupPrefix}
      themeName={props.themeName}
      columnsConfig={props.columnsConfig}
      cellRenderer={props.cellRenderer}
    />
  </Table>
);
TokensDetailsTable.propTypes = {
  columnsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  cellRenderer: PropTypes.func.isRequired,
  themeName: PropTypes.string.isRequired,
  tokensGroupPrefix: PropTypes.string,
  tokensGroupData: PropTypes.array.isRequired,
};

export function SingleTokensGroupDetails(props) {
  const filteredGroupItems = filterGroupItemsValues(
    props.groupItems,
    props.filterText
  );

  return (
    <section>
      <h2 id={props.id}>{props.title || upperFirst(props.id)}</h2>
      {props.subtitle && <p>{props.subtitle}</p>}
      <GroupStyle isVisible={filteredGroupItems.length > 0}>
        <TokensDetailsTable
          columnsConfig={props.columnsConfig}
          cellRenderer={props.cellRenderer}
          themeName={props.themeName}
          tokensGroupPrefix=""
          tokensGroupData={filteredGroupItems}
        />
      </GroupStyle>
    </section>
  );
}
SingleTokensGroupDetails.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  filterText: PropTypes.string.isRequired,
  groupItems: PropTypes.object.isRequired,
  columnsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  cellRenderer: PropTypes.func.isRequired,
  themeName: PropTypes.string.isRequired,
};

export const MultiTokensGroupDetails = (props) => (
  <section>
    <h2 id={props.id}>{props.title || upperFirst(props.id)}</h2>
    {props.subtitle && <p>{props.subtitle}</p>}
    {Object.entries(props.tokensGroupData).map(
      ([tokenGroupKey, tokenGroupConfig]) => {
        const filteredTokensGroups = filterGroupItemsValues(
          tokenGroupConfig[props.id],
          props.filterText
        );

        return (
          <GroupStyle
            key={`tokens-group_${tokenGroupKey}`}
            isVisible={filteredTokensGroups.length > 0}
          >
            <a id={`${props.id}-${tokenGroupConfig.prefix}`} />
            <h3>{tokenGroupConfig.label}</h3>
            {Boolean(tokenGroupConfig.description) && (
              <p>{tokenGroupConfig.description}</p>
            )}
            <TokensDetailsTable
              columnsConfig={props.columnsConfig}
              cellRenderer={props.cellRenderer}
              themeName={props.themeName}
              tokensGroupPrefix={tokenGroupConfig.prefix}
              tokensGroupData={filteredTokensGroups}
            />
          </GroupStyle>
        );
      }
    )}
  </section>
);
MultiTokensGroupDetails.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  filterText: PropTypes.string.isRequired,
  tokensGroupData: PropTypes.object.isRequired,
  columnsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  cellRenderer: PropTypes.func.isRequired,
  themeName: PropTypes.string.isRequired,
};
