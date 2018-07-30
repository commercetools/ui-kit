import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import omit from 'lodash.omit';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import Constraints from '../../materials/constraints';
import filterDataAttributes from '../../utils/filter-data-attributes';
import messages from './messages';

class AsyncCreatableSelectInput extends React.Component {
  // Formik will set the field to an array on submission, so we always have to
  // deal with an array. The touched state ends up being an empty array in case
  // values were removed only. So we have to treat any array we receive as
  // a signal of the field having been touched.
  static isTouched = touched => Array.isArray(touched);
  static displayName = 'AsyncCreatableSelectInput';
  static propTypes = {
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    isMulti: PropTypes.bool,
    formatCreateLabel: PropTypes.func,
    noOptionsMessage: PropTypes.func,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };
  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div {...filterDataAttributes(this.props)}>
          <AsyncCreatableSelect
            {...omit(this.props, 'horizontalConstraint')}
            onChange={value => {
              const event = {
                // We do not need to fake the event name for isMulti here, as
                // the value will hold the full array.
                target: { name: this.props.name, value },
                persist: () => {},
              };
              this.props.onChange(event);
            }}
            onBlur={
              this.props.onBlur
                ? () => {
                    const event = {
                      target: {
                        name: (() => {
                          if (!this.props.name) return undefined;
                          if (!this.props.isMulti) return this.props.name;
                          // We append the ".0" to make Formik set the touched
                          // state as an array instead of a boolean only.
                          // Otherwise the shapes would clash on submission, as
                          // Formik will create an array on submission anyways.
                          return `${this.props.name}.0`;
                        })(),
                      },
                      persist: () => {},
                    };
                    this.props.onBlur(event);
                  }
                : undefined
            }
            formatCreateLabel={
              this.props.formatCreateLabel ||
              (inputValue =>
                this.props.intl.formatMessage(messages.createLabel, {
                  inputValue,
                }))
            }
            noOptionsMessage={
              this.props.noOptionsMessage ||
              (({ inputValue }) =>
                inputValue === ''
                  ? this.props.intl.formatMessage(
                      messages.noOptionsMessageWithoutInputValue
                    )
                  : this.props.intl.formatMessage(
                      messages.noOptionsMessageWithInputValue,
                      { inputValue }
                    ))
            }
          />
        </div>
      </Constraints.Horizontal>
    );
  }
}

const Wrapped = injectIntl(AsyncCreatableSelectInput);
Wrapped.isTouched = AsyncCreatableSelectInput.isTouched;
export default Wrapped;
