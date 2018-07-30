import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import omit from 'lodash.omit';
import Constraints from '../../materials/constraints';
import filterDataAttributes from '../../utils/filter-data-attributes';

export default class SelectInput extends React.Component {
  static displayName = 'SelectInput';
  static propTypes = {
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    isMulti: PropTypes.bool,
    onBlur: PropTypes.func,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
      })
    ),
  };
  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div {...filterDataAttributes(this.props)}>
          <Select
            {...omit(this.props, 'horizontalConstraint')}
            onChange={
              typeof this.props.onChange === 'function'
                ? option => {
                    const event = {
                      target: { name: this.props.name, value: option },
                      persist: () => {},
                    };
                    this.props.onChange(event);
                  }
                : undefined
            }
            onBlur={
              typeof this.props.onBlur === 'function'
                ? () => {
                    const event = {
                      target: {
                        name: (() => {
                          if (!this.props.isMulti) return this.props.name;
                          // We append the ".0" to make Formik set the touched
                          // state as an array instead of a boolean only.
                          // Otherwise the shapes would clash on submission, as
                          // Formik will create an array on submission anyways.
                          return this.props.name
                            ? `${this.props.name}.0`
                            : undefined;
                        })(),
                      },
                      persist: () => {},
                    };
                    this.props.onBlur(event);
                  }
                : undefined
            }
          />
        </div>
      </Constraints.Horizontal>
    );
  }
}
