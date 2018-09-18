import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import requiredIf from 'react-required-if';
import FlatButton from '../../buttons/flat-button';
import { AngleUpIcon } from '../../icons';
import Spacings from '../../spacings';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Text from '../../typography/text';
import messages from './messages';
import styles from './localized-multiline-text-input.mod.css';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getClassNames = props => {
  if (props.isDisabled) return styles.disabled;
  if (props.hasError) return styles.error;
  if (props.hasWarning) return styles.warning;
  if (props.isReadOnly) return styles.readonly;

  return styles.pristine;
};

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
    const getCommands = props => {
      if (props.error) return <div>{this.props.error}</div>;
      if (props.warning) return <div>{this.props.warning}</div>;
      return this.props.languagesControl;
    };

    return (
      <Spacings.Stack scale="xs">
        <div key={this.props.language} className={styles.fieldContainer}>
          <label htmlFor={this.props.id} className={styles.languageLabel}>
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
            className={classnames(
              getClassNames({
                isDisabled: this.props.isDisabled,
                hasError: this.props.hasError,
                hasWarning: this.props.hasWarning,
                isReadOnly: this.props.isReadOnly,
              }),
              { [styles.inputClosed]: this.props.isCollapsed }
            )}
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
        <div className={styles.commandsContainer}>
          <div className={styles.commandsLeft}>{getCommands(this.props)}</div>
          <div className={styles.commandsExpand}>
            {!this.props.isCollapsed &&
              contentExceedsShownRows && (
                <FlatButton
                  onClick={this.props.onToggle}
                  type="primary"
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
