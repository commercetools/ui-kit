import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { useIntl } from 'react-intl';
import { css } from '@emotion/core';
import MultilineInput from '../../internals/multiline-input';
import FlatButton from '../../buttons/flat-button';
import { AngleUpIcon, AngleDownIcon } from '../../icons';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import useToggleState from '../../../hooks/use-toggle-state';
import Spacings from '../../spacings';
import Constraints from '../../constraints';
import messages from '../../internals/messages/multiline-input';

const COLLAPSED_HEIGHT = 32;

const MultilineTextInput = props => {
  const intl = useIntl();

  const ref = React.useRef();
  const [renderToggleButton, setRenderToggleButton] = React.useState(false);

  const updateRenderToggleButton = React.useCallback(() => {
    if (ref.current && ref.current.el) {
      const doesExceedCollapsedHeightLimit =
        ref.current.el.offsetHeight > COLLAPSED_HEIGHT;

      if (doesExceedCollapsedHeightLimit && !renderToggleButton) {
        setRenderToggleButton(true);
      }
      if (!doesExceedCollapsedHeightLimit && renderToggleButton) {
        setRenderToggleButton(false);
      }
    }
  }, [setRenderToggleButton, renderToggleButton]);

  React.useEffect(() => {
    updateRenderToggleButton();
  }, [props.value, updateRenderToggleButton]);

  const [isOpen, toggle] = useToggleState(props.defaultExpandMultilineText);

  const { onFocus } = props;
  const handleFocus = React.useCallback(() => {
    if (!isOpen) toggle();
    if (onFocus) onFocus();
  }, [isOpen, onFocus, toggle]);

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <Spacings.Stack scale="xs">
        <div>
          <MultilineInput
            name={props.name}
            forwardedRef={ref}
            autoComplete={props.autoComplete}
            value={props.value}
            onChange={props.onChange}
            // onHeightChange={handleHeightChange}
            id={props.id}
            onBlur={props.onBlur}
            onFocus={handleFocus}
            isDisabled={props.isDisabled}
            hasError={props.hasError}
            hasWarning={props.hasWarning}
            placeholder={props.placeholder}
            isReadOnly={props.isReadOnly}
            isAutofocussed={props.isAutofocussed}
            isOpen={isOpen}
            {...filterDataAttributes(props)}
          />
        </div>
        {renderToggleButton && (
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
            `}
          >
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
          </div>
        )}
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
};

MultilineTextInput.defaultProps = {
  defaultExpandMultilineText: false,
};

export default MultilineTextInput;
