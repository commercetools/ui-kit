import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import requiredIf from 'react-required-if';
import { css } from '@emotion/core';
import FlatButton from '../../buttons/flat-button';
import { AngleUpIcon } from '../../icons';
import Spacings from '../../spacings';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Text from '../../typography/text';
import messages from './messages';
import {
  getTextareaStyles,
  getLanguageLabelStyles,
} from './translation-input.styles';

export default class TranslationInput extends React.Component {
  static displayName = 'TranslationInput';

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
    language: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isCollapsed: PropTypes.bool,
    onToggle: PropTypes.func,
    isAutofocussed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    languagesControl: PropTypes.node,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    placeholder: PropTypes.string,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    error: PropTypes.node,
    warning: PropTypes.node,
  };

  // The minimum ammount of rows the MultilineTextInput will show.
  // When the input is closed, this is used as the maximum row count as well
  // so that the input "collapses".
  static MIN_ROW_COUNT = 1;

  state = {
    // This is the internal "fake" rendered textarea element's height in rows
    contentRowCount: TranslationInput.MIN_ROW_COUNT,
  };

  handleHeightChange = (_, innerComponent) => {
    this.setState({
      contentRowCount: innerComponent.valueRowCount,
    });
  };

  handleChange = event => {
    // We manipulate the event to add the language to the target.
    // That way the users of LocalizedTextInput's onChange can read
    // event.target.language and event.target.value to determine the next value.
    //
    // We only need this information for the story, the MC application code will
    // never need to access the information in such an inconvenient way, as
    // Formik can deal with a name like "foo.en" and sets the value correctly.
    // We can't use this as we aren't guaranteed a name in the story as the user
    // might clear it using the knob, and then we can't parse the language from
    // the input name anymore.
    //
    // eslint-disable-next-line no-param-reassign
    event.target.language = this.props.language;
    this.props.onChange(event);
  };

  render() {
    // This checks if the content in the textarea overflows the minimum
    // amount of lines it should have when collapsed
    const contentExceedsShownRows =
      this.state.contentRowCount > TranslationInput.MIN_ROW_COUNT;

    return (
      <Spacings.Stack scale="xs">
        <div
          key={this.props.language}
          css={css`
            width: 100%;
            position: relative;
            display: flex;
          `}
        >
          <label
            htmlFor={this.props.id}
            css={theme => getLanguageLabelStyles(this.props, theme)}
          >
            {/* FIXME: add proper tone for disabled when tones are refactored */}
            <Text.Detail tone="secondary">
              {this.props.language.toUpperCase()}
            </Text.Detail>
          </label>
          <TextareaAutosize
            id={this.props.id}
            name={this.props.name}
            type="text"
            value={this.props.value}
            onChange={this.handleChange}
            onHeightChange={this.handleHeightChange}
            onBlur={this.props.onBlur}
            onFocus={() => {
              // Expand the input on focus
              if (this.props.isCollapsed) this.props.onToggle();
              if (this.props.onFocus) this.props.onFocus();
            }}
            disabled={this.props.isDisabled}
            placeholder={this.props.placeholder}
            css={theme => getTextareaStyles(this.props, theme)}
            readOnly={this.props.isReadOnly}
            autoFocus={this.props.isAutofocussed}
            /* ARIA */
            aria-readonly={this.props.isReadOnly}
            role="textbox"
            minRows={TranslationInput.MIN_ROW_COUNT}
            maxRows={
              this.props.isCollapsed
                ? TranslationInput.MIN_ROW_COUNT
                : undefined
            }
            {...filterDataAttributes(this.props)}
          />
        </div>
        <div
          css={css`
            display: flex;
          `}
        >
          <div
            css={css`
              flex: 1;
            `}
          >
            {(() => {
              if (this.props.error) return <div>{this.props.error}</div>;
              if (this.props.warning) return <div>{this.props.warning}</div>;
              return this.props.languagesControl;
            })()}
          </div>
          <div
            css={css`
              flex: 0;
            `}
          >
            {!this.props.isCollapsed && contentExceedsShownRows && (
              <FlatButton
                onClick={this.props.onToggle}
                isDisabled={this.props.isDisabled}
                label={this.props.intl.formatMessage(messages.collapse)}
                icon={<AngleUpIcon size="small" />}
              />
            )}
          </div>
        </div>
        {(this.props.error || this.props.warning) &&
          this.props.languagesControl}
      </Spacings.Stack>
    );
  }
}
