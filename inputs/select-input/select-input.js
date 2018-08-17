import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { defaultMemoize } from 'reselect';
import classnames from 'classnames';
import Select, { components } from 'react-select';
import omit from 'lodash.omit';
import Constraints from '../../materials/constraints';
import filterDataAttributes from '../../utils/filter-data-attributes';
import { CaretDownIcon, CloseIcon } from '../../icons';
import './select-input.css';
import messages from './messages';

const DropdownIndicator = props =>
  components.DropdownIndicator && (
    <components.DropdownIndicator {...props}>
      {/* FIXME: add proper tone when tones are refactored */}
      <CaretDownIcon theme={props.isDisabled && 'grey'} size="small" />
    </components.DropdownIndicator>
  );

const ClearIndicator = props => (
  <div className="react-select__clear-indicator" {...props.innerProps}>
    {/* FIXME: add proper tone when tones are refactored */}
    <CloseIcon theme={props.isDisabled && 'grey'} size="medium" />
  </div>
);

ClearIndicator.displayName = 'ClearIndicator';

ClearIndicator.propTypes = {
  innerProps: PropTypes.object,
  isDisabled: PropTypes.bool,
};

// TODO: add tokens from <Tag /> to tags

export class SelectInput extends React.Component {
  static displayName = 'SelectInput';

  // Both "true" and an empty array [] represent a touched state. The Boolean
  // conveniently handles both cases
  static isTouched = touched => Boolean(touched);

  static propTypes = {
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    name: PropTypes.string,
    value: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(PropTypes.string).isRequired(props, ...rest)
        : PropTypes.string(props, ...rest),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    isDisabled: PropTypes.bool,
    isMulti: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
      })
    ),
    noOptionsMessage: PropTypes.func,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
  };

  // memoizing as this could get slow (~6ms for 1000 checked values)
  // We can improve the algorithm more in case this becomes an issue, but taking
  // the hit once and relying on memoization afterwards should be enough for now
  getSelectedOptions = defaultMemoize(
    (isMulti, options, value) =>
      isMulti
        ? options.filter(option => value.includes(option.value))
        : options.find(option => option.value === value)
  );

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div {...filterDataAttributes(this.props)}>
          <Select
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
              DropdownIndicator,
              ClearIndicator,
            }}
            classNamePrefix="react-select"
            onChange={selectedOptions =>
              // selectedOptions is either an array, or a single option
              // depending on whether we're in multi-mode or not (isMulti)
              this.props.onChange({
                target: {
                  name: this.props.name,
                  // eslint-disable-next-line no-nested-ternary
                  value: selectedOptions
                    ? this.props.isMulti
                      ? selectedOptions.map(option => option.value)
                      : selectedOptions.value
                    : selectedOptions,
                },
                persist: () => {},
              })
            }
            value={this.getSelectedOptions(
              this.props.isMulti,
              this.props.options,
              this.props.value
            )}
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

const Enhanced = injectIntl(SelectInput);
Enhanced.isTouched = SelectInput.isTouched;
export default Enhanced;
