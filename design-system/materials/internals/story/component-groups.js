import PropTypes from 'prop-types';
import {
  Table,
  TokenNameHeaderCell,
  Token,
  GroupStyle,
  DeprecationBadge,
} from './shared-components';

const filterComponentGroupsGroupValues = (componentGroups, searchText) =>
  Object.entries(componentGroups).filter(
    ([key, state]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      (state.description &&
        state.description.toLowerCase().includes(searchText.toLowerCase()))
  );

export const ComponentGroupsDetailsList = (props) => {
  const componentGroups = filterComponentGroupsGroupValues(
    props.states,
    props.searchText
  );
  return (
    <GroupStyle isVisible={componentGroups.length > 0}>
      <Table>
        <thead>
          <tr>
            <TokenNameHeaderCell>State</TokenNameHeaderCell>
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
ComponentGroupsDetailsList.displayName = 'ComponentGroupsDetailsList';
ComponentGroupsDetailsList.propTypes = {
  searchText: PropTypes.string.isRequired,
  states: PropTypes.shape({
    decisions: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export const ComponentGroupsLinks = () => {
  return (
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
  );
};
