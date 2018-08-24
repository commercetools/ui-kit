import React from 'react';
import PropTypes from 'prop-types';
import has from 'lodash.has';
import uuid from 'uuid';
import { FormattedMessage } from 'react-intl';
import requiredIf from 'react-required-if';
import Constraints from '../../materials/constraints';
import Spacings from '../../materials/spacings';
import FieldLabel from '../../field-label';
import TextInput from '../../inputs/text-input';
import ErrorMessage from '../../messages/error-message';
import filterDataAttributes from '../../utils/filter-data-attributes';
import messages from './messages';

const isObject = obj => typeof obj === 'object';

const hasErrors = errors => Object.values(errors).some(Boolean);

const isKnownError = error => error === 'missing';

class TextField extends React.Component {
  static displayName = 'TextField';

  static isEmpty = value => !value || value.trim().length === 0;

  static propTypes = {
    // TextField
    id: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    renderError: PropTypes.func,
    isRequired: PropTypes.bool,
    isTouched: PropTypes.bool,

    // TextInput
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isAutofocussed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    placeholder: PropTypes.string,

    // LabelField
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    hint: requiredIf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      props => props.hintIcon
    ),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onInfoButtonClick: PropTypes.func,
    hintIcon: PropTypes.node,
    badge: PropTypes.node,
  };

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (props, state) => ({
    id: (() => {
      if (has(props, 'id')) return props.id;
      if (state.id) return state.id;
      return uuid();
    })(),
  });

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Spacings.Stack>
          <FieldLabel
            title={this.props.title}
            hint={this.props.hint}
            description={this.props.description}
            onInfoButtonClick={this.props.onInfoButtonClick}
            hintIcon={this.props.hintIcon}
            badge={this.props.badge}
            hasRequiredIndicator={this.props.isRequired}
            htmlFor={this.state.id}
          />
          <Spacings.Stack scale="xs">
            <TextInput
              id={this.state.id}
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
              onBlur={this.props.onBlur}
              onFocus={this.props.onFocus}
              isAutofocussed={this.props.isAutofocussed}
              isDisabled={this.props.isDisabled}
              isReadOnly={this.props.isReadOnly}
              hasError={this.props.isTouched && hasErrors(this.props.errors)}
              placeholder={this.props.placeholder}
              horizontalConstraint="scale"
              {...filterDataAttributes(this.props)}
            />
            {this.props.isTouched &&
              isObject(this.props.errors) &&
              this.props.errors.missing && (
                <ErrorMessage>
                  <FormattedMessage {...messages.missingRequiredField} />
                </ErrorMessage>
              )}
            {this.props.isTouched &&
              this.props.renderError &&
              isObject(this.props.errors) &&
              Object.entries(this.props.errors)
                // Only render errors which have truthy values, to avoid
                // rendering an error for, e.g. { missing: false }
                // Also avoid rendering custom messages for known errors.
                .filter(([key, error]) => !isKnownError(key) && error)
                .map(([key, error]) => {
                  const errorComponent = this.props.renderError(key, error);
                  // Avoid rendering an ErrorMessage with no children as it
                  // leads to a prop-type warning
                  return errorComponent ? (
                    <ErrorMessage key={key}>{errorComponent}</ErrorMessage>
                  ) : null;
                })}
          </Spacings.Stack>
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}

export default TextField;
