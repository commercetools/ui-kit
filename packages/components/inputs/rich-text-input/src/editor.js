import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import pick from 'lodash/pick';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import { usePrevious } from '@commercetools-uikit/hooks';
import Stack from '@commercetools-uikit/spacings-stack';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import { messagesMultilineInput } from '@commercetools-uikit/input-utils';
import {
  RichTextBody,
  HiddenInput,
} from '@commercetools-uikit/rich-text-utils';
import { EditorWrapper } from './editor.styles';

const COLLAPSED_HEIGHT = 32;

const Editor = (props) => {
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

  return (
    <CollapsibleMotion
      minHeight={COLLAPSED_HEIGHT}
      isDefaultClosed={!props.defaultExpandMultilineText}
    >
      {({ isOpen, toggle, containerStyles, registerContentNode }) => {
        // opens the input if it regains focus and it's closed
        if (
          prevIsFocused !== props.editor.value.selection.isFocused &&
          props.editor.value.selection.isFocused &&
          !isOpen
        ) {
          toggle();
        }
        return (
          <Constraints.Horizontal max={props.horizontalConstraint}>
            <Stack scale="xs" alignItems="flex-end">
              <EditorWrapper
                isDisabled={props.isDisabled}
                isReadOnly={props.isReadOnly}
              >
                <RichTextBody
                  ref={{
                    containerRef: ref,
                    registerContentNode,
                  }}
                  hasError={props.hasError}
                  isDisabled={props.isDisabled}
                  hasWarning={props.hasWarning}
                  isReadOnly={props.isReadOnly}
                  showExpandIcon={props.showExpandIcon}
                  onClickExpand={props.onClickExpand}
                  editor={props.editor}
                  containerStyles={containerStyles}
                >
                  {props.children}
                </RichTextBody>
              </EditorWrapper>
              {renderToggleButton && (
                // <div>
                <FlatButton
                  onClick={toggle}
                  label={
                    isOpen
                      ? intl.formatMessage(messagesMultilineInput.collapse)
                      : intl.formatMessage(messagesMultilineInput.expand)
                  }
                  icon={
                    isOpen ? (
                      <AngleUpIcon size="small" />
                    ) : (
                      <AngleDownIcon size="small" />
                    )
                  }
                />
                // </div>
              )}
            </Stack>
          </Constraints.Horizontal>
        );
      }}
    </CollapsibleMotion>
  );
};

// eslint-disable-next-line react/display-name
const renderEditor = (props, editor, next) => {
  const internalId = `${props.id}__internal__id`;

  const children = React.cloneElement(next(), {
    id: internalId,
  });

  const isFocused = props.editor.value.selection.isFocused;

  const passedProps = {
    name: props.name,
    id: props.id,
    isReadOnly: props.readOnly,
    isDisabled: props.disabled,
    ...pick(props.options, [
      'horizontalConstraint',
      'defaultExpandMultilineText',
      'showExpandIcon',
      'onClickExpand',
      'hasError',
      'hasWarning',
    ]),
    ...filterDataAttributes(props),
  };

  return (
    <Editor editor={editor} {...passedProps}>
      {children}
      <HiddenInput
        isFocused={isFocused}
        handleFocus={editor.focus}
        id={props.id}
        disabled={props.disabled}
        readOnly={props.readOnly}
      />
    </Editor>
  );
};

const sharedProps = {
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  horizontalConstraint: PropTypes.oneOf([
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    'scale',
    'auto',
  ]),
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
