import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import omit from 'lodash.omit';
import AsyncSelect from 'react-select/lib/Async';
import { components as defaultComponents } from 'react-select';
import classnames from 'classnames';
import Constraints from '../../../materials/constraints';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import addStaticFields from '../../../utils/add-static-fields';
import ClearIndicator from '../../internals/clear-indicator';
import DropdownIndicator from '../../internals/dropdown-indicator';
import LoadingIndicator from '../../internals/loading-indicator';
import TagRemove from '../../internals/tag-remove';
import '../../internals/select.css';
import messages from './messages';

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  LoadingIndicator,
  MultiValueRemove: TagRemove,
};

export class AsyncSelectInput extends React.Component {
  // Formik will set the field to an array on submission, so we always have to
  // deal with an array. The touched state ends up being an empty array in case
  // values were removed only. So we have to treat any array we receive as
  // a signal of the field having been touched.
  static isTouched = touched => Boolean(touched);

  static displayName = 'AsyncSelectInput';

  // Using "null" will ensure that the currently selected value disappears in
  // case "undefined" gets passed as the next value
  static defaultProps = { value: null };

  static propTypes = {
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    name: PropTypes.string,
    value: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(
            PropTypes.shape({ value: PropTypes.string.isRequired })
          ).isRequired(props, ...rest)
        : PropTypes.shape({ value: PropTypes.string.isRequired })(
            props,
            ...rest
          ),
    options: PropTypes.objectOf(
      PropTypes.shape({ value: PropTypes.string.isRequired })
    ),
    defaultOptions: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
        })
      ),
    ]),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    loadOptions: PropTypes.func.isRequired,
    isMulti: PropTypes.bool,
    components: PropTypes.object,
    noOptionsMessage: PropTypes.func,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
  };

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div {...filterDataAttributes(this.props)}>
          <AsyncSelect
            {...omit(this.props, [
              'horizontalConstraint',
              'hasError',
              'hasWarning',
            ])}
            className={classnames('react-select', {
              // We use global styles here as the react-select styles are global
              // as well. This sucks.
              // The alternative would be to style the components, but this
              // would mean we'd need to export our design tokens to JS.
              'react-select-error': this.props.hasError,
              'react-select-warning': this.props.hasWarning,
            })}
            components={{
              ...this.props.components,
              ...customizedComponents,
            }}
            classNamePrefix="react-select"
            onChange={(value, info) => {
              this.props.onChange(
                {
                  target: { name: this.props.name, value },
                  persist: () => {},
                },
                info
              );
            }}
            value={this.props.value}
            loadOptions={this.props.loadOptions}
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
            isSearchable={true}
          />
        </div>
      </Constraints.Horizontal>
    );
  }
}

const Wrapped = injectIntl(AsyncSelectInput);
addStaticFields(Wrapped, {
  ...defaultComponents,
  ...customizedComponents,
  isTouched: AsyncSelectInput.isTouched,
});
export default Wrapped;
