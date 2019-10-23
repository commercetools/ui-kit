import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useIntl } from 'react-intl';
import pick from 'lodash/pick';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import CollapsibleMotion from '../../collapsible-motion';
import usePrevious from '../../../hooks/use-previous';
import Spacings from '../../spacings';
import { AngleUpIcon, AngleDownIcon } from '../../icons';
import Constraints from '../../constraints';
import FlatButton from '../../buttons/flat-button';
import RichTextBody from '../../internals/rich-text-body';
import messages from '../../internals/messages/multiline-input';

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
            <Spacings.Stack scale="xs">
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
            </Spacings.Stack>
          </Constraints.Horizontal>
        );
      }}
    </CollapsibleMotion>
  );
};

// eslint-disable-next-line react/display-name
const renderEditor = (props, editor, next) => {
  const children = React.cloneElement(next(), {
    tagName: 'output',
  });

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
