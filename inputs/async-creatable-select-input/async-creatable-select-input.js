import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import has from 'lodash.has';
import omit from 'lodash.omit';
import isNil from 'lodash.isnil';
import keyBy from 'lodash.keyby';
import oneLineTrim from 'common-tags/lib/oneLineTrim';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import { components } from 'react-select';
import classnames from 'classnames';
import Constraints from '../../materials/constraints';
import filterDataAttributes from '../../utils/filter-data-attributes';
import { CaretDownIcon, CloseIcon } from '../../icons';
import '../select-input/select-input.css';
import messages from './messages';

// These are duplicated from SelectInput
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

class AsyncCreatableSelectInput extends React.Component {
  // Formik will set the field to an array on submission, so we always have to
  // deal with an array. The touched state ends up being an empty array in case
  // values were removed only. So we have to treat any array we receive as
  // a signal of the field having been touched.
  static isTouched = touched => Boolean(touched);

  static displayName = 'AsyncCreatableSelectInput';

  static defaultProps = {
    data: {},
  };

  static propTypes = {
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    name: PropTypes.string,
    value: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(PropTypes.string).isRequired(props, ...rest)
        : PropTypes.string(props, ...rest),
    defaultOptions: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
        })
      ),
    ]),

    onCreateOption: (props, propName, componentName) =>
      props[propName]
        ? new Error(
            oneLineTrim`
            Invalid prop \`${propName}\` supplied to \`${componentName}\`.
            This property is not supported yet on \`AsyncCreatableSelectInput\`
            as its use-cases are unclear so far. Feel free to add it in case you
            come across an actual use-case.
          `
          )
        : undefined,
    onChange: PropTypes.func.isRequired,
    data: PropTypes.objectOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
      })
    ),
    onData: PropTypes.func,
    onBlur: PropTypes.func,
    loadOptions: PropTypes.func.isRequired,
    isMulti: PropTypes.bool,
    formatCreateLabel: PropTypes.func,
    noOptionsMessage: PropTypes.func,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
  };

  state = {
    // We store the selected options in the state so that we can map the plain
    // values, passed in by the parent, back to actual options for react-select.
    //
    // The selected options are stored as an objected, keyed by the value of
    // option, no matter whether it's in isMulti mode or not.
    selectedOptions: {},
  };

  static getDerivedStateFromProps = (props, state) => ({
    selectedOptions: { ...state.selectedOptions, ...props.data },
  });

  warnOnMissingOptions = () => {
    if (isNil(this.props.value)) return;
    const hasOptionsForAllValues = this.props.isMulti
      ? this.props.value.every(value => has(this.state.selectedOptions, value))
      : has(this.state.selectedOptions, this.props.value);

    if (process.env.NODE_ENV !== 'production' && !hasOptionsForAllValues) {
      // eslint-disable-next-line no-console
      console.warn(
        'AsyncCreatableSelectInput: received value which can not be mapped to an option'
      );
    }
  };

  componentDidMount() {
    this.warnOnMissingOptions();
  }

  componentDidUpdate() {
    this.warnOnMissingOptions();
  }

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div {...filterDataAttributes(this.props)}>
          <AsyncCreatableSelect
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
            onChange={(value, info) => {
              const data = isNil(value)
                ? {}
                : keyBy(this.props.isMulti ? value : [value], 'value');
              this.setState({ selectedOptions: data });
              if (this.props.onData) this.props.onData(data);

              this.props.onChange(
                {
                  target: {
                    name: this.props.name,
                    // eslint-disable-next-line no-nested-ternary
                    value: value
                      ? this.props.isMulti
                        ? value.map(option => option.value)
                        : value.value
                      : value,
                  },
                  persist: () => {},
                },
                info
              );
            }}
            value={
              this.props.isMulti
                ? this.props.value.map(
                    value => this.state.selectedOptions[value]
                  )
                : this.state.selectedOptions[this.props.value]
            }
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
            isSearchable={true}
          />
        </div>
      </Constraints.Horizontal>
    );
  }
}

const Wrapped = injectIntl(AsyncCreatableSelectInput);
Wrapped.isTouched = AsyncCreatableSelectInput.isTouched;
export default Wrapped;
