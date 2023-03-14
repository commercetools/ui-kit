import PropTypes from 'prop-types';

import {
  Table,
  TokenNameHeaderCell,
  Token,
  GroupStyle,
  DeprecationBadge,
} from './shared-components';

const filterStatesGroupValues = (states, searchText) =>
  Object.entries(states).filter(
    ([key, state]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      (state.description &&
        state.description.toLowerCase().includes(searchText.toLowerCase()))
  );

export const StatesDetailsList = (props) => {
  const states = filterStatesGroupValues(props.states, props.searchText);
  return (
    <GroupStyle isVisible={states.length > 0}>
      <Table>
        <thead>
          <tr>
            <TokenNameHeaderCell>State</TokenNameHeaderCell>
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
StatesDetailsList.displayName = 'StatesDetailsList';
StatesDetailsList.propTypes = {
  searchText: PropTypes.string.isRequired,
  states: PropTypes.shape({
    decisions: PropTypes.objectOf(PropTypes.string),
    description: PropTypes.string,
  }).isRequired,
};

export const StatesLinks = () => {
  return (
    <a
      href="#states"
      onClick={(event) => {
        event.preventDefault();
        window.scrollTo(0, document.getElementById('states').offsetTop);
      }}
    >
      States
    </a>
  );
};
