import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useIntl } from 'react-intl';
import pick from 'lodash/pick';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import { usePrevious } from '@commercetools-uikit/hooks';
import Stack from '@commercetools-uikit/spacings-stack';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import RichTextBody from '../../internals/rich-text-body';
import HiddenInput from '../../internals/rich-text-body/hidden-input';
import messages from '../../internals/messages/multiline-input';

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
          <Constraints.Horizontal constraint={props.horizontalConstraint}>
            <Stack scale="xs">
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
              {renderToggleButton && (
                <div
                  css={css`
                    display: flex;
                    justify-content: flex-end;
                  `}
                >
                  <FlatButton
                    onClick={toggle}
                    label={
                      isOpen
                        ? intl.formatMessage(messages.collapse)
                        : intl.formatMessage(messages.expand)
                    }
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
