import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { injectIntl, intlShape } from 'react-intl';
import { filterDataAttributes } from '@commercetools-local/utils/dataset';
import Collapsible from '@commercetools-local/ui-kit/collapsible';
import TextareaAutosize from 'react-textarea-autosize';
import FlatButton from '@commercetools-local/ui-kit/buttons/flat-button';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-local/ui-kit/icons';
import Constraints from '../../materials/constraints';
import styles from './textarea.mod.css';
import messages from './messages';

export class TextArea extends React.Component {
  static displayName = 'TextArea';

  static DEFAULT_ROWS_NUMBER = 1;

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

    // HoC
    intl: intlShape.isRequired,
  };

  state = {
    numOfRows: TextArea.DEFAULT_ROWS_NUMBER,
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

  handleHeightChange = (_, innerComponent) => {
    this.setState({
      numOfRows: innerComponent.rowCount,
    });
  };

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Collapsible isDefaultClosed={false}>
          {({ isOpen, toggle }) => (
            <div>
              <TextareaAutosize
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onChange}
                onHeightChange={this.handleHeightChange}
                id={this.props.id}
                onBlur={this.props.onBlur}
                onFocus={() => {
                  if (!isOpen) toggle();
                  this.props.onFocus();
                }}
                disabled={this.props.isDisabled}
                placeholder={this.props.placeholder}
                className={this.getStyles(this.props)}
                readOnly={this.props.isReadOnly}
                autoFocus={this.props.isAutofocussed}
                /* ARIA */
                aria-readonly={this.props.isReadOnly}
                aria-multiline="true"
                role="textbox"
                minRows={TextArea.DEFAULT_ROWS_NUMBER}
                maxRows={!isOpen ? TextArea.DEFAULT_ROWS_NUMBER : undefined}
                {...filterDataAttributes(this.props)}
                useCacheForDOMMeasurements={true}
              />
              {(this.state.numOfRows > TextArea.DEFAULT_ROWS_NUMBER ||
                !isOpen) && (
                <FlatButton
                  onClick={toggle}
                  type="primary"
                  isDisabled={this.props.isDisabled}
                  label={this.props.intl.formatMessage(
                    messages[isOpen ? 'collapse' : 'expand']
                  )}
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

export default injectIntl(TextArea);
