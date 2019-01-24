import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { injectIntl } from 'react-intl';
import TextareaAutosize from 'react-textarea-autosize';
import { css } from '@emotion/core';
import FlatButton from '../../buttons/flat-button';
import { AngleUpIcon, AngleDownIcon } from '../../icons';
import Collapsible from '../../collapsible';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Spacings from '../../spacings';
import Constraints from '../../constraints';
import messages from './messages';
import { getTextareaStyles } from './multiline-text-input.styles';

export class MultilineTextInput extends React.Component {
  static displayName = 'MultilineTextInput';

  // The minimum ammount of rows the MultilineTextInput will show.
  // When the input is closed, this is used as the maximum row count as well
  // so that the input "collapses".
  static MIN_ROW_COUNT = 1;

  static isEmpty = value => !value || value.trim().length === 0;

  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isAutofocussed: PropTypes.bool,
    defaultExpandMultilineText: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    placeholder: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),

    // HoC
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    // This is the internal "fake" rendered textarea element's height in rows
    contentRowCount: MultilineTextInput.MIN_ROW_COUNT,
  };

  handleHeightChange = (_, innerComponent) => {
    this.setState({
      contentRowCount: innerComponent.valueRowCount,
    });
  };

  render() {
    // This checks if the content in the textarea overflows the minimum
    // amount of lines it should have when collapsed
    const shouldRenderToggleButton =
      this.state.contentRowCount > MultilineTextInput.MIN_ROW_COUNT;

    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Collapsible isDefaultClosed={!this.props.defaultExpandMultilineText}>
          {({ isOpen, toggle }) => (
            <Spacings.Stack scale="xs">
              <TextareaAutosize
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onChange}
                onHeightChange={this.handleHeightChange}
                id={this.props.id}
                onBlur={this.props.onBlur}
                onFocus={() => {
                  if (!isOpen) toggle();
                  if (this.props.onFocus) this.props.onFocus();
                }}
                disabled={this.props.isDisabled}
                placeholder={this.props.placeholder}
                css={getTextareaStyles(this.props)}
                readOnly={this.props.isReadOnly}
                autoFocus={this.props.isAutofocussed}
                /* ARIA */
                aria-readonly={this.props.isReadOnly}
                aria-multiline="true"
                role="textbox"
                minRows={MultilineTextInput.MIN_ROW_COUNT}
                maxRows={isOpen ? undefined : MultilineTextInput.MIN_ROW_COUNT}
                useCacheForDOMMeasurements={true}
                {...filterDataAttributes(this.props)}
              />
              {shouldRenderToggleButton && (
                <div
                  css={css`
                    display: flex;
                    justify-content: flex-end;
                  `}
                >
                  <FlatButton
                    onClick={toggle}
                    isDisabled={this.props.isDisabled}
                    label={this.props.intl.formatMessage(
                      isOpen ? messages.collapse : messages.expand
                    )}
                    icon={
                      isOpen ? (
                        <AngleUpIcon size="small" />
                      ) : (
                        <AngleDownIcon size="small" />
                      )
                    }
                  />
                </div>
              )}
            </Spacings.Stack>
          )}
        </Collapsible>
      </Constraints.Horizontal>
    );
  }
}

const Enhanced = injectIntl(MultilineTextInput);
// manually hoist public statics
Enhanced.isEmpty = MultilineTextInput.isEmpty;
export default Enhanced;
