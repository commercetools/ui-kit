import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import omit from 'lodash.omit';
import keyBy from 'lodash.keyby';
import oneLineTrim from 'common-tags/lib/oneLineTrim';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import Constraints from '../../materials/constraints';
import filterDataAttributes from '../../utils/filter-data-attributes';
import messages from './messages';

class AsyncCreatableSelectInput extends React.Component {
  // Formik will set the field to an array on submission, so we always have to
  // deal with an array. The touched state ends up being an empty array in case
  // values were removed only. So we have to treat any array we receive as
  // a signal of the field having been touched.
  static isTouched = touched => Boolean(touched);
  static displayName = 'AsyncCreatableSelectInput';
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
            as its use-cases were unclear. Feel free to add it.
          `
          )
        : undefined,
    onChange: PropTypes.func.isRequired,
    onData: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    loadOptions: PropTypes.func.isRequired,
    isMulti: PropTypes.bool,
    formatCreateLabel: PropTypes.func,
    noOptionsMessage: PropTypes.func,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };
  state = {
    options: Array.isArray(this.props.defaultOptions)
      ? keyBy(this.props.defaultOptions, 'value')
      : {},
  };
  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div {...filterDataAttributes(this.props)}>
          <AsyncCreatableSelect
            {...omit(this.props, ['horizontalConstraint'])}
            onChange={(value, info) => {
              if (info.action === 'create-option') {
                if (this.props.isMulti) {
                  const addedOption = value.find(option => option.__isNew__);
                  this.setState(prevState => ({
                    options: {
                      ...prevState.options,
                      [addedOption.value]: addedOption,
                    },
                  }));
                } else {
                  this.setState({ options: value });
                }
              }
              this.props.onData(
                keyBy(this.props.isMulti ? value : [value], 'value')
              );
              this.props.onChange({
                target: {
                  name: this.props.name,
                  // eslint-disable-next-line no-nested-ternary
                  value: value
                    ? this.props.isMulti
                      ? value.map(o => o.value)
                      : value.value
                    : value,
                },
                persist: () => {},
              });
            }}
            value={
              this.props.isMulti
                ? this.props.value.map(value => this.state.options[value])
                : this.state.options[this.props.value]
            }
            loadOptions={searchText =>
              this.props.loadOptions(searchText).then(options => {
                this.setState(prevState => ({
                  options: { ...prevState.options, ...keyBy(options, 'value') },
                }));
                return options;
              })
            }
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
