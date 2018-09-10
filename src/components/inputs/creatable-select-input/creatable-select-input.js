import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classnames from 'classnames';
import CreatableSelect from 'react-select/lib/Creatable';
import { components as defaultComponents } from 'react-select';
import omit from 'lodash.omit';
import Constraints from '../../../materials/constraints';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import addStaticFields from '../../../utils/add-static-fields';
import ClearIndicator from '../../internals/clear-indicator';
import DropdownIndicator from '../../internals/dropdown-indicator';
import TagRemove from '../../internals/tag-remove';
import '../../internals/select.css';
import messages from './messages';

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  MultiValueRemove: TagRemove,
};

export class CreatableSelectInput extends React.Component {
  static displayName = 'SelectInput';

  // Both "true" and an empty array [] represent a touched state. The Boolean
  // conveniently handles both cases
  static isTouched = touched => Boolean(touched);

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
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    isDisabled: PropTypes.bool,
    isMulti: PropTypes.bool,
    components: PropTypes.object,
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({ value: PropTypes.string.isRequired }),
        PropTypes.shape({
          options: PropTypes.arrayOf(
            PropTypes.shape({ value: PropTypes.string.isRequired })
          ),
        }),
      ])
    ),
    formatCreateLabel: PropTypes.func,
    noOptionsMessage: PropTypes.func,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
  };

  static defaultProps = {
    // Using "null" will ensure that the currently selected value disappears in
    // case "undefined" gets passed as the next value
    value: null,
    // The input needs to be searchable, otherwise it's not possible to create
    // new options.
    // We still allow consumers to pass isSearchable={false} so that they can
    // use CreatableSelectInput as an alternative to SelectInput, which does
    // not do the option/value mapping going on there and therefore provides
    // the default API of react-select.
    isSearchable: true,
  };

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div {...filterDataAttributes(this.props)}>
          <CreatableSelect
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
            onChange={(value, info) =>
              // selectedOptions is either an array, or a single option
              // depending on whether we're in multi-mode or not (isMulti)
              this.props.onChange(
                {
                  target: { name: this.props.name, value },
                  persist: () => {},
                },
                info
              )
            }
            value={this.props.value}
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

const Enhanced = injectIntl(CreatableSelectInput);
addStaticFields(Enhanced, {
  ...defaultComponents,
  ...customizedComponents,
  isTouched: CreatableSelectInput.isTouched,
});
export default Enhanced;
