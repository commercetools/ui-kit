import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useIntl } from 'react-intl';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import CollapsibleMotion from '../../collapsible-motion';
import Spacings from '../../spacings';
import { AngleUpIcon, AngleDownIcon } from '../../icons';
import Constraints from '../../constraints';
import FlatButton from '../../buttons/flat-button';
import RichTextBody from '../../internals/rich-text-body';
import messages from './messages';

const COLLAPSED_HEIGHT = 32;

const Editor = props => {
  const intl = useIntl();
  const ref = React.useRef();

  const [renderToggleButton, setRenderToggleButton] = React.useState(false);

  React.useEffect(() => {
    const doesExceedCollapsedHeightLimit =
      ref.current.clientHeight > COLLAPSED_HEIGHT;

    if (doesExceedCollapsedHeightLimit && !renderToggleButton) {
      setRenderToggleButton(true);
    }
    if (!doesExceedCollapsedHeightLimit && renderToggleButton) {
      setRenderToggleButton(false);
    }
  }, [props.editor.value.document, renderToggleButton]);

  return (
    <CollapsibleMotion
      minHeight={COLLAPSED_HEIGHT}
      isDefaultClosed={!props.defaultExpandMultilineText}
    >
      {({ isOpen, toggle, containerStyles, registerContentNode }) => {
        return (
          <Constraints.Horizontal constraint={props.horizontalConstraint}>
            <Spacings.Stack scale="xs">
              <RichTextBody
                ref={{
                  containerRef: ref,
                  registerContentNode,
                }}
                isOpen={isOpen}
                hasError={props.hasError}
                isDisabled={props.isDisabled}
                hasWarning={props.hasWarning}
                isReadOnly={props.isReadOnly}
                editor={props.editor}
                onFocus={() => {
                  if (!isOpen) {
                    toggle();
                    setTimeout(() => setRenderToggleButton(true), 0);
                  }
                }}
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
  const children = next();

  const passedProps = {
    name: props.name,
    id: props.id,
    isDisabled: props.disabled,
    horizontalConstraint: props.options.horizontalConstraint,
    defaultExpandMultilineText: props.options.defaultExpandMultilineText,
    hasError: props.options.hasError,
    hasWarning: props.options.hasWarning,
    isReadOnly: props.readOnly,
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
