import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import has from 'lodash.has';
import flatMap from 'lodash.flatmap';
import classnames from 'classnames';
import Select from 'react-select';
import omit from 'lodash.omit';
import Constraints from '../../../materials/constraints';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import ClearIndicator from '../../internals/clear-indicator';
import DropdownIndicator from '../../internals/dropdown-indicator';
import TagRemove from '../../internals/tag-remove';
import '../../internals/select.css';
import messages from './messages';

export class SelectInput extends React.Component {
  static displayName = 'SelectInput';

  // Both "true" and an empty array [] represent a touched state. The Boolean
  // conveniently handles both cases
  static isTouched = touched => Boolean(touched);

  static defaultProps = {
    maxMenuHeight: 200,
  };
  static propTypes = {
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    name: PropTypes.string,
    value: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(PropTypes.string).isRequired(props, ...rest)
        : PropTypes.string(props, ...rest),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    maxMenuHeight: PropTypes.number,
    isDisabled: PropTypes.bool,
    isMulti: PropTypes.bool,
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
    noOptionsMessage: PropTypes.func,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
  };

  state = { selectedOptions: [] };

  static getDerivedStateFromProps = props => {
    // Options can be grouped as
    //   const colourOptions = [{ value: 'green', label: 'Green' }];
    //   const flavourOptions = [{ value: 'vanilla', label: 'Vanilla' }];
    //   const groupedOptions = [
    //     { label: 'Colours', options: colourOptions },
    //     { label: 'Flavours', options: flavourOptions },
    //   ];
    // So we "ungroup" the options by merging them all into one list first.
    const optionsWithoutGroups = flatMap(
      props.options,
      option => (has(option, 'value') ? option : option.options)
    );

    /**
     * When user sets new value prop, if it was undfined, and gets passed to Select as undfined
     * Select will keep previouse state, which will be confusing for the user
     * This is why we default to null
     * https://react-select.com/props#prop-types
     */
    return {
      selectedOptions: props.isMulti
        ? optionsWithoutGroups.filter(option =>
            props.value.includes(option.value)
          )
        : optionsWithoutGroups.find(
            option => has(option, 'value') && option.value === props.value
          ) || null,
    };
  };

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
            maxMenuHeight={this.props.maxMenuHeight}
            components={{
              DropdownIndicator,
              ClearIndicator,
              MultiValueRemove: TagRemove,
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
            value={this.state.selectedOptions}
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
