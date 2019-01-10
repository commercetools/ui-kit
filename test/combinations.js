import React from 'react';
import PropTypes from 'prop-types';

const getName = (prefix, combi) => {
  const name = Object.entries(combi)
    .map(([prop, value]) => {
      if (typeof value === 'boolean') {
        return value ? prop : `regular`;
      }
      return value;
    })
    .join('/');

  return `${prefix}/${name}`;
};

const computeCombinations = entries => {
  const [entry, ...remainingEntries] = entries;
  if (!entry) return [];
  const [name, values] = entry;
  return values.flatMap(value => ({
    name,
    value,
    remainingEntries: computeCombinations(remainingEntries),
  }));
};

const flattenRemainingEntries = (combi, props) => {
  const enhancedProps = { ...props, [combi.name]: combi.value };
  if (combi.remainingEntries.length === 0) return enhancedProps;
  return combi.remainingEntries.flatMap(entry =>
    flattenRemainingEntries(entry, enhancedProps)
  );
};

const getCombinations = config => {
  const entries = Object.entries(config);
  return computeCombinations(entries).flatMap(entry =>
    flattenRemainingEntries(entry, {})
  );
};

const Combinations = props => {
  const combinations = getCombinations(props.config);

  return (
    <React.Fragment>
      {combinations
        .filter(combi => !props.skip(combi))
        .map(combi =>
          props.render(
            combi,
            typeof props.name === 'string'
              ? getName(props.name, combi)
              : props.name(combi)
          )
        )}
    </React.Fragment>
  );
};

Combinations.displayName = 'Combinations';

Combinations.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  render: PropTypes.func.isRequired,
  skip: PropTypes.func,
  reshape: PropTypes.func,
  config: PropTypes.object.isRequired,
};

Combinations.defaultProps = {
  skip: () => false,
};

export default Combinations;
