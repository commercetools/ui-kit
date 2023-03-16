import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';
import { designTokens } from '@commercetools-uikit/design-system';
import { /*choiceValueResolver,*/ getIsDeprecated } from './utils';
// import { getSampleComponent } from './samplers';

export const Table = styled.table`
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

export const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  font-family: ${designTokens.fontFamilyDefault};
  color: ${designTokens.colorSolid}
  margin: 10px;
  > * + * {
    margin: 16px 0 0 0;
  }
`;

export const GroupStyle = styled.div`
  padding: 10px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

export const Token = styled.p`
  font-family: monospace;
`;

export const TokenNameHeaderCell = styled.td`
  min-width: 400px;
`;

export const Description = styled.p`
  font-size: 10pt;
  margin: 10px 0;
`;

export const DeprecationBadge = () => (
  <b style={{ color: 'orange' }}>DEPRECATED</b>
);
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

const filterGroupItemsValues = (groupItems, searchText) =>
  Object.entries(groupItems).filter(
    ([key, value]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      value?.toLowerCase?.().includes(searchText.toLowerCase()) ||
      value?.description?.toLowerCase().includes(searchText.toLowerCase())
  );

export const GroupLinks = (props) => {
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
GroupLinks.propTypes = {
  id: PropTypes.string.isRequired,
  config: PropTypes.object,
  filterText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const TableBody = (props) => {
  return (
    <tbody>
      {props.groupItems.map(([tokenName, tokenData]) => {
        // const ChoiceSample = getSampleComponent(props.groupItemsPrefix);
        // const choiceValue = choiceValueResolver(tokenName, props.themeName);
        // return (
        //   <tr key={`choices-${tokenName}-body-key`}>
        //     <td>
        //       <Token>{tokenName}</Token>
        //       {getIsDeprecated(tokenName) && <DeprecationBadge />}
        //     </td>
        //     <td>
        //       <ChoiceSample value={choiceValue} />
        //       &nbsp;{choiceValue}
        //     </td>
        //   </tr>
        // );

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
  groupItemsPrefix: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
  columnsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  cellRenderer: PropTypes.func.isRequired,
};

export function GroupItemsDetailedList(props) {
  const filteredGroupItems = filterGroupItemsValues(
    props.groupItems,
    props.searchText
  );
  console.log({ groupItems: props.groupItems, filteredGroupItems });
  return (
    <>
      <h2 id={props.id}>{props.title || upperFirst(props.id)}</h2>
      <GroupStyle isVisible={filteredGroupItems.length > 0}>
        <Table>
          <thead>
            <tr>
              {props.columnsConfig.map((columnsConfig) => (
                <td key={columnsConfig.key}>
                  {columnsConfig.label || upperFirst(columnsConfig.key)}
                </td>
              ))}
            </tr>
          </thead>
          <TableBody
            groupItems={filteredGroupItems}
            groupItemsPrefix={undefined}
            themeName={props.themeName}
            columnsConfig={props.columnsConfig}
            cellRenderer={props.cellRenderer}
          />
        </Table>
      </GroupStyle>
    </>
  );
}
GroupItemsDetailedList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  searchText: PropTypes.string.isRequired,
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
