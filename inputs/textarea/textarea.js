import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from '@commercetools-local/ui-kit/collapsible';
import requiredIf from 'react-required-if';
import TextareaAutosize from 'react-textarea-autosize';
import FlatButton from '@commercetools-local/ui-kit/buttons/flat-button';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-local/ui-kit/icons';
import Constraints from '../../materials/constraints';
import styles from './textarea.mod.css';

class TextArea extends React.Component {
  static displayName = 'TextArea';
  static DEFAULT_ROWS_NUMBER = 1;

  state = {
    rows: TextArea.DEFAULT_ROWS_NUMBER,
  };

  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isAutofocussed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    placeholder: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  };

  // NOTE: order is important here
  // * a disabled-field currently does not display warning/error-states so it takes precedence
  // * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
  // how you can interact with the field is controlled separately by the props, this only influences visuals
  getStyles = props => {
    if (props.isDisabled) return styles.disabled;
    if (props.hasError) return styles.error;
    if (props.hasWarning) return styles.warning;
    if (props.isReadOnly) return styles.readonly;

    return styles.pristine;
  };

  toggleCollapse = toggle => {
    toggle();
  };

  handleFocus = (isOpen, toggle) => {
    if (!isOpen) {
      this.toggleCollapse(toggle);
    }
    if (this.props.onFocus) this.props.onFocus();
  };

  handleHeightChange = (_, innerComponent) => {
    this.setState({
      rows: innerComponent.rowCount,
    });
  };

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Collapsible>
          {({ isOpen, toggle }) => (
            <div>
              <TextareaAutosize
                name={this.props.name}
                onChange={this.props.onChange}
                onHeightChange={this.handleHeightChange}
                id={this.props.id}
                onBlur={this.props.onBlur}
                onFocus={() => this.handleFocus(isOpen, toggle)}
                disabled={this.props.isDisabled}
                placeholder={this.props.placeholder}
                className={this.getStyles(this.props)}
                readOnly={this.props.isReadOnly}
                autoFocus={this.props.isAutofocussed}
                /* ARIA */
                aria-readonly={this.props.isReadOnly}
                role="textbox"
                minRows={TextArea.DEFAULT_ROWS_NUMBER}
                maxRows={!isOpen ? TextArea.DEFAULT_ROWS_NUMBER : undefined}
                useCacheForDOMMeasurements={true}
              />
              {(this.state.rows > TextArea.DEFAULT_ROWS_NUMBER || !isOpen) && (
                <FlatButton
                  onClick={() => this.toggleCollapse(toggle)}
                  type="primary"
                  isDisabled={this.props.isDisabled}
                  label={!isOpen ? 'Expand' : 'Collapse'}
                  icon={
                    !isOpen ? (
                      <AngleDownIcon size="small" />
                    ) : (
                      <AngleUpIcon size="small" />
                    )
                  }
                />
              )}
            </div>
          )}
        </Collapsible>
      </Constraints.Horizontal>
    );
  }
}

export default TextArea;
