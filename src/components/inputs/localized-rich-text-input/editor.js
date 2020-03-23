import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import pick from 'lodash/pick';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useIntl } from 'react-intl';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { usePrevious } from '@commercetools-uikit/hooks';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import Stack from '@commercetools-uikit/spacings-stack';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import FlatButton from '@commercetools-uikit/flat-button';
import RichTextBody from '../../internals/rich-text-body';
import HiddenInput from '../../internals/rich-text-body/hidden-input';
import { getLanguageLabelStyles } from './editor.styles';
import messages from '../../internals/messages/multiline-input';

const COLLAPSED_HEIGHT = 32;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
`;

const RightColumn = styled.div`
  flex: 0;
  display: flex;
  align-items: flex-start;
`;

const Row = styled.div`
  display: flex;
  &:empty {
    margin: 0 !important;
  }
`;

const Editor = (props) => {
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
          <Stack scale="xs">
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
                css={(theme) => getLanguageLabelStyles(props, theme)}
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
                    width: 0;
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
                showExpandIcon={props.showExpandIcon}
                onClickExpand={props.onClickExpand}
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
              {renderToggleButton && (
                <React.Fragment>
                  <LeftColumn />
                  <RightColumn>
                    <FlatButton
                      onClick={toggle}
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
                  </RightColumn>
                </React.Fragment>
              )}
            </Row>
            {(props.error || props.warning) && props.languagesControl()}
          </Stack>
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

  const passedProps = {
    id: props.id,
    isDisabled: props.disabled,
    isReadOnly: props.readOnly,
    ...pick(props.options, [
      'defaultExpandMultilineText',
      'language',
      'warning',
      'error',
      'hasWarning',
      'hasError',
      'toggleLanguage',
      'languagesControl',
      'isOpen',
      'showExpandIcon',
      'onClickExpand',
    ]),
    ...filterDataAttributes(props),
  };

  const isFocused = props.editor.value.selection.isFocused;

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

Editor.displayName = 'Editor';
Editor.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  hasWarning: PropTypes.bool,
  hasError: PropTypes.bool,
  editor: PropTypes.any,
  error: PropTypes.node,
  warning: PropTypes.node,
  defaultExpandMultilineText: PropTypes.bool.isRequired,
  toggleLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  languagesControl: PropTypes.func.isRequired,
  showExpandIcon: PropTypes.bool.isRequired,
  onClickExpand: requiredIf(PropTypes.func, (props) => props.showExpandIcon),
};

renderEditor.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  editor: PropTypes.any,
  options: PropTypes.shape({
    language: PropTypes.string.isRequired,
    error: PropTypes.node,
    warning: PropTypes.node,
    hasWarning: PropTypes.bool,
    hasError: PropTypes.bool,
    defaultExpandMultilineText: PropTypes.bool.isRequired,
    toggleLanguage: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    languagesControl: PropTypes.func.isRequired,
    showExpandIcon: PropTypes.bool.isRequired,
    onClickExpand: requiredIf(PropTypes.func, (props) => props.showExpandIcon),
  }),
};

export default renderEditor;
