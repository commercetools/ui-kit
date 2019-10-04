import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useIntl } from 'react-intl';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import usePrevious from '../../../hooks/use-previous';
import CollapsibleMotion from '../../collapsible-motion';
import Spacings from '../../spacings';
import { AngleUpIcon } from '../../icons';
import Text from '../../typography/text';
import FlatButton from '../../buttons/flat-button';
import RichTextBody from '../../internals/rich-text-body';

import messages from './messages';
import { getLanguageLabelStyles } from './editor.styles';

const COLLAPSED_HEIGHT = 32;

const Editor = props => {
  const intl = useIntl();
  const ref = React.useRef();
  const prevIsFocused = usePrevious(props.editor.value.selection.isFocused);

  const [renderToggleButton, setRenderToggleButton] = React.useState(false);

  const updateRenderToggleButton = React.useCallback(() => {
    const doesExceedCollapsedHeightLimit =
      ref.current.clientHeight > COLLAPSED_HEIGHT;

    if (doesExceedCollapsedHeightLimit && !renderToggleButton) {
      setRenderToggleButton(true);
    }
    if (!doesExceedCollapsedHeightLimit && renderToggleButton) {
      setRenderToggleButton(false);
    }
  }, [setRenderToggleButton, renderToggleButton]);

  React.useEffect(() => {
    updateRenderToggleButton();
  }, [props.editor.value.document, updateRenderToggleButton]);

  const { toggleLanguage } = props;

  const [shouldBeOpen, setIsOpen] = React.useState(props.isOpen);

  const onToggle = React.useCallback(() => {
    setIsOpen(!shouldBeOpen);
    toggleLanguage(props.language);
  }, [toggleLanguage, props.language, shouldBeOpen]);

  // opens the input if it regains focus and it's closed
  if (
    prevIsFocused !== props.editor.value.selection.isFocused &&
    props.editor.value.selection.isFocused &&
    !shouldBeOpen
  ) {
    onToggle();
  }

  return (
    <CollapsibleMotion
      minHeight={COLLAPSED_HEIGHT}
      isClosed={!shouldBeOpen}
      onToggle={onToggle}
      isDefaultClosed={!props.defaultExpandMultilineText}
    >
      {({ isOpen, toggle, containerStyles, registerContentNode }) => {
        return (
          <Spacings.Stack scale="xs">
            <div
              key={props.language}
              css={css`
                width: 100%;
                position: relative;
                display: flex;
              `}
            >
              <label
                htmlFor={props.id}
                css={theme => getLanguageLabelStyles(props, theme)}
              >
                {/* FIXME: add proper tone for disabled when tones are refactored */}
                <Text.Detail tone="secondary">
                  {props.language.toUpperCase()}
                </Text.Detail>
              </label>

              <RichTextBody
                ref={{
                  containerRef: ref,
                  registerContentNode,
                }}
                styles={{
                  container: css`
                    flex: auto;
                    width: 100%;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                  `,
                }}
                isOpen={props.isOpen}
                hasError={props.hasError}
                isDisabled={props.isDisabled}
                hasWarning={props.hasWarning}
                isReadOnly={props.isReadOnly}
                editor={props.editor}
                containerStyles={containerStyles}
              >
                {props.children}
              </RichTextBody>
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
                  if (props.error) return <div>{props.error}</div>;
                  if (props.warning) return <div>{props.warning}</div>;
                  return props.languagesControl();
                })()}
              </div>
              <div
                css={css`
                  flex: 0;
                `}
              >
                {renderToggleButton && isOpen && (
                  <FlatButton
                    onClick={toggle}
                    label={intl.formatMessage(messages.collapse)}
                    icon={<AngleUpIcon size="small" />}
                  />
                )}
              </div>
            </div>
            {(props.error || props.warning) && props.languagesControl()}
          </Spacings.Stack>
        );
      }}
    </CollapsibleMotion>
  );
};

// eslint-disable-next-line react/display-name
const renderEditor = (props, editor, next) => {
  const children = next();

  const passedProps = {
    name: props.name,
    id: props.id,
    isDisabled: props.disabled,
    defaultExpandMultilineText: props.options.defaultExpandMultilineText,
    language: props.options.language,
    hasError: props.options.hasError,
    error: props.options.error,
    warning: props.options.warning,
    hasWarning: props.options.hasWarning,
    isReadOnly: props.readOnly,
    toggleLanguage: props.options.toggleLanguage,
    languagesControl: props.options.languagesControl,
    isOpen: props.options.isOpen,
    ...filterDataAttributes(props),
  };

  return (
    <Editor editor={editor} {...passedProps}>
      {children}
    </Editor>
  );
};

const sharedProps = {
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
};

Editor.displayName = 'Editor';
Editor.propTypes = { ...sharedProps, editor: PropTypes.any };

renderEditor.propTypes = {
  ...sharedProps,
  options: PropTypes.shape({
    hasWarning: PropTypes.bool,
    hasError: PropTypes.bool,
  }),
};

export default renderEditor;
