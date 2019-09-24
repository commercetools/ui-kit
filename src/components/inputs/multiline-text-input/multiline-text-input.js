import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { useIntl } from 'react-intl';
import TextareaAutosize from 'react-textarea-autosize';
import styled from '@emotion/styled';
import FlatButton from '../../buttons/flat-button';
import { AngleUpIcon, AngleDownIcon } from '../../icons';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import useToggleState from '../../../hooks/use-toggle-state';
import Spacings from '../../spacings';
import Constraints from '../../constraints';
import messages from './messages';
import { getTextareaStyles } from './multiline-text-input.styles';

const ToggleButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TextContainer = styled.div``;

const MultilineTextInput = props => {
  const intl = useIntl();

  const [contentRowCount, setContentRowCount] = React.useState(
    MultilineTextInput.MIN_ROW_COUNT
  );

  const [isOpen, toggle] = useToggleState(props.defaultExpandMultilineText);

  const { onFocus } = props;
  const handleFocus = React.useCallback(() => {
    if (!isOpen) toggle();
    if (onFocus) onFocus();
  }, [isOpen, onFocus, toggle]);

  const handleHeightChange = React.useCallback(
    (_, innerComponent) => {
      setContentRowCount(innerComponent.valueRowCount);
    },
    [setContentRowCount]
  );

  // This checks if the content in the textarea overflows the minimum
  // amount of lines it should have when collapsed
  const shouldRenderToggleButton =
    contentRowCount > MultilineTextInput.MIN_ROW_COUNT;

  const ToggleContainer =
    props.components.ToggleContainer || ToggleButtonContainer;

  const TextAreaContainer = props.components.TextAreaContainer || TextContainer;

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <Spacings.Stack scale="xs">
        <TextAreaContainer {...props.componentProps.TextAreaContainer}>
          <TextareaAutosize
            name={props.name}
            autoComplete={props.autoComplete}
            value={props.value}
            onChange={props.onChange}
            className={props.className}
            onHeightChange={handleHeightChange}
            id={props.id}
            onBlur={props.onBlur}
            onFocus={handleFocus}
            disabled={props.isDisabled}
            placeholder={props.placeholder}
            css={theme => getTextareaStyles(props, theme)}
            readOnly={props.isReadOnly}
            autoFocus={props.isAutofocussed}
            /* ARIA */
            aria-readonly={props.isReadOnly}
            aria-multiline="true"
            role="textbox"
            minRows={MultilineTextInput.MIN_ROW_COUNT}
            maxRows={isOpen ? undefined : MultilineTextInput.MIN_ROW_COUNT}
            useCacheForDOMMeasurements={true}
            {...filterDataAttributes(props)}
          />
        </TextAreaContainer>
        <ToggleContainer
          {...props.componentProps.ToggleContainer}
          isOpen={isOpen}
        >
          {shouldRenderToggleButton && (
            <FlatButton
              onClick={toggle}
              isDisabled={props.isDisabled}
              label={intl.formatMessage(
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
          )}
        </ToggleContainer>
      </Spacings.Stack>
    </Constraints.Horizontal>
  );
};

MultilineTextInput.displayName = 'MultilineTextInput';

// The minimum ammount of rows the MultilineTextInput will show.
// When the input is closed, this is used as the maximum row count as well
// so that the input "collapses".
MultilineTextInput.MIN_ROW_COUNT = 1;

MultilineTextInput.isEmpty = value => !value || value.trim().length === 0;

MultilineTextInput.propTypes = {
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  components: PropTypes.shape({
    TextAreaContainer: PropTypes.elementType,
    ToggleContainer: PropTypes.elementType,
  }),
  componentProps: PropTypes.shape({
    TextAreaContainer: PropTypes.object,
    ToggleContainer: PropTypes.object,
  }),
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
};

MultilineTextInput.defaultProps = {
  components: {},
  componentProps: {},
  defaultExpandMultilineText: false,
};

export default MultilineTextInput;
