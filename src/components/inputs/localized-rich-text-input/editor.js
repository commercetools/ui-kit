import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useIntl } from 'react-intl';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import usePrevious from '../../../hooks/use-previous';
import CollapsibleMotion from '../../collapsible-motion';
import Spacings from '../../spacings';
import { AngleUpIcon } from '../../icons';
import Text from '../../typography/text';
import FlatButton from '../../buttons/flat-button';
import RichTextBody from '../../internals/rich-text-body';
import { getLanguageLabelStyles } from './editor.styles';
import messages from './messages';

const COLLAPSED_HEIGHT = 32;

const LeftColumn = styled.div`
  flex: 1;
`;

const RightColumn = styled.div`
  flex: 0;
`;

const Row = styled.div`
  display: flex;
  &:empty {
    margin: 0 !important;
  }
`;

const Editor = props => {
  const intl = useIntl();
  const ref = React.useRef();
  const prevIsFocused = usePrevious(props.editor.value.selection.isFocused);

  const [renderToggleButton, setRenderToggleButton] = React.useState(false);

  const { toggleLanguage } = props;
  const onToggle = React.useCallback(() => {
    toggleLanguage(props.language);
  }, [toggleLanguage, props.language]);

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

  // opens the input if it regains focus and it's closed
  if (
    prevIsFocused !== props.editor.value.selection.isFocused &&
    props.editor.value.selection.isFocused &&
    !props.isOpen
  ) {
    onToggle();
  }

  const languagesControl = props.languagesControl();

  return (
    <CollapsibleMotion
      minHeight={COLLAPSED_HEIGHT}
      isClosed={!props.isOpen}
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
            <Row>
              {(() => {
                if (props.error)
                  return (
                    <LeftColumn>
                      <div>{props.error}</div>
                    </LeftColumn>
                  );
                if (props.warning)
                  return (
                    <LeftColumn>
                      <div>{props.warning}</div>
                    </LeftColumn>
                  );
                return (
                  languagesControl && (
                    <LeftColumn>{languagesControl}</LeftColumn>
                  )
                );
              })()}
              {renderToggleButton && isOpen && (
                <React.Fragment>
                  <LeftColumn />
                  <RightColumn>
                    <FlatButton
                      onClick={toggle}
                      label={intl.formatMessage(messages.collapse)}
                      icon={<AngleUpIcon size="small" />}
                    />
                  </RightColumn>
                </React.Fragment>
              )}
            </Row>
            {(props.error || props.warning) && props.languagesControl()}
          </Spacings.Stack>
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
