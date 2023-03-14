import PropTypes from 'prop-types';

import {
  Table,
  TokenNameHeaderCell,
  Token,
  GroupStyle,
  DeprecationBadge,
} from './shared-components';

const filterVariantsGroupValues = (variants, searchText) =>
  Object.entries(variants).filter(
    ([key, state]) =>
      key.toLowerCase().includes(searchText.toLowerCase()) ||
      (state.description &&
        state.description.toLowerCase().includes(searchText.toLowerCase()))
  );

export const VariantsDetailsList = (props) => {
  const variants = filterVariantsGroupValues(props.variants, props.searchText);
  return (
    <GroupStyle isVisible={variants.length > 0}>
      <Table>
        <thead>
          <tr>
            <TokenNameHeaderCell>Variant</TokenNameHeaderCell>
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
VariantsDetailsList.displayName = 'VariantsDetailsList';
VariantsDetailsList.propTypes = {
  searchText: PropTypes.string.isRequired,
  variants: PropTypes.shape({
    decisions: PropTypes.objectOf(PropTypes.string),
    description: PropTypes.string,
  }).isRequired,
};

export const VariantsLinks = () => {
  return (
    <a
      href="#variants"
      onClick={(event) => {
        event.preventDefault();
        window.scrollTo(0, document.getElementById('variants').offsetTop);
      }}
    >
      Variants
    </a>
  );
};
