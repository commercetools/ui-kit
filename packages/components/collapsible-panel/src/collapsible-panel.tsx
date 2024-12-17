import { ReactNode, cloneElement } from 'react';
import isNil from 'lodash/isNil';
import styled from '@emotion/styled';
import {
  createSequentialId,
  filterDataAttributes,
  warning,
} from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { useFieldId } from '@commercetools-uikit/hooks';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import Constraints from '@commercetools-uikit/constraints';
import HeaderIcon from './header-icon';
import {
  baseContainerStyles,
  getHeaderContainerStyles,
  getThemeStyle,
  HeaderControlsWrapper,
  SectionWrapper,
  SectionContent,
  SectionDescriptionWrapper,
} from './collapsible-panel.styles';
import CollapsiblePanelHeader from './collapsible-panel-header';

const HeaderContainer = styled(AccessibleButton)``;

const panelButtonSequentialId = createSequentialId('collapsible-panel-button-');
const panelContentSequentialId = createSequentialId(
  'collapsible-panel-content-'
);

export type TCollapsiblePanel = {
  /**
   * An unique id for the panel header, which will also be used to generate a prefixed id for the panel content section.
   * <br/>
   * Read about `getPanelContentId` below for more about this.
   */
  id?: string;
  /**
   * The title being rendered at top left of the panel
   */
  header: ReactNode;
  /**
   * A secondary header for the panel (only pass if needed)
   */
  secondaryHeader?: ReactNode;
  /**
   * If passed will be shown below the title as more information regarding the panel
   */
  description?: string;
  /**
   * Allow to override the styles by passing a `className` prop.
   * <br/>
   * Custom styles can also be passed using the [`css` prop from emotion](https://emotion.sh/docs/css-prop#style-precedence).
   */
  className?: string;
  /**
   * Makes the panel's header sticky in regards to the page's scroll
   */
  isSticky?: boolean;
  /**
   * Controls at the top right part of the panel
   */
  headerControls?: ReactNode;
  /**
   * Disables the panel and all interactions with it
   */
  isDisabled?: boolean;
  /**
   * The actual content rendered inside the panel
   */
  children?: ReactNode;
  /**
   * Indicates the color scheme of the panel.
   */
  tone?: 'urgent' | 'primary';
  /**
   * Determines the background color of the panel.
   */
  theme?: 'dark' | 'light';
  /**
   * Whenever `true` the headers and content itself
   * will consume less space in that to the borders are smaller and everything has less padding
   */
  condensed?: boolean;
  /**
   * Controls the visibility of the expansion controls on the left
   */
  hideExpansionControls?: boolean;
  /**
   * Indicates the position of the control elements in the header component.
   */
  headerControlsAlignment?: 'left' | 'right';
  /**
   * Indicates if the panel's content should be collapsed or shown by default.
   * <br />
   * Updates to this value are not respected. Only used for **uncontrolled** mode (when no`onToggle` is passed.)
   */
  isDefaultClosed?: boolean;
  /**
   * Indicates if the panel's content should be collapsed or shown.
   * <br />
   * Component becomes **controlled* when this is passed.
   */
  isClosed?: boolean;
  /**
   * function to be triggered whenever the user clicks the top area to collapse the panel's content
   * <br />
   * Becomes required when `isClosed` is passed.
   */
  onToggle?: () => void;
  /**
   * Horizontal size limit of the panel.
   */
  horizontalConstraint?:
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
};

const HeadLineText = (
  props: Pick<TCollapsiblePanel, 'condensed' | 'header'>
) => {
  if (!props.condensed) {
    return <>{props.header}</>;
  }

  return (
    <Text.Subheadline as="h4" truncate>
      {/* TODO: this is a temporary fix, which will be refactored after we align with the desing team on how to proceed */}
      {typeof props.header === 'string'
        ? props.header
        : cloneElement(props.header as React.ReactElement, {
            isCondensed: props.condensed,
          })}
    </Text.Subheadline>
  );
};

// When `isClosed` is provided the component behaves as a controlled component,
// otherwise it will behave like an uncontrolled component.
const CollapsiblePanel = ({
  theme = 'dark',
  condensed = false,
  isDisabled = false,
  headerControlsAlignment = 'right',
  horizontalConstraint = 'scale',
  ...props
}: TCollapsiblePanel) => {
  const panelButtonId = useFieldId(props.id, panelButtonSequentialId);
  const panelContentId = useFieldId(undefined, panelContentSequentialId);
  // Pass only `data-*` props
  const dataProps = filterDataAttributes({
    theme,
    condensed,
    isDisabled,
    headerControlsAlignment,
    horizontalConstraint,
    ...props,
  });
  const scale = condensed ? 's' : 'm';

  const isClosedAndIsDefaultClosed =
    !isNil(props.isClosed) && !isNil(props.isDefaultClosed);
  warning(
    !isClosedAndIsDefaultClosed,
    `Invalid prop \`isDefaultClosed\` supplied to \`CollapsiblePanel\`. Component must either be controlled or uncontrolled. Pass either \`isClosed\` or \`isDefaultClosed\` but not both.`
  );

  const hasOnToggle = !isNil(props.onToggle);
  const isControlledComponent = !isNil(props.isClosed);

  // controlled
  if (isControlledComponent) {
    warning(
      hasOnToggle,
      `missing required prop \`onToggle\` when using the "isClosed" prop (controlled component).`
    );
  }

  // uncontrolled
  if (!isControlledComponent) {
    warning(
      !hasOnToggle,
      `Invalid prop \`onToggle\` supplied to \`CollapsiblePanel\`. \`onToggle\` does not have any effect when the component is uncontrolled.`
    );
  }

  return (
    <CollapsibleMotion
      isClosed={props.isClosed}
      onToggle={props.onToggle}
      isDefaultClosed={props.isDefaultClosed}
    >
      {({ isOpen, toggle, containerStyles, registerContentNode }) => (
        <Constraints.Horizontal max={horizontalConstraint}>
          <div
            css={[baseContainerStyles, getThemeStyle('light')]}
            // Allow to override the styles by passing a `className` prop.
            // Custom styles can also be passed using the `css` prop from emotion.
            // https://emotion.sh/docs/css-prop#style-precedence
            className={props.className}
          >
            <HeaderContainer
              as="div"
              css={[
                getHeaderContainerStyles(
                  {
                    condensed,
                    isDisabled,
                    headerControlsAlignment,
                    ...props,
                  },
                  isOpen
                ),
                getThemeStyle('light'),
              ]}
              id={panelButtonId}
              label=""
              onClick={isDisabled ? undefined : toggle}
              isDisabled={isDisabled}
              buttonAttributes={dataProps}
              aria-controls={panelContentId}
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              <Spacings.Inline alignItems="center" scale="xs">
                {!props.hideExpansionControls && (
                  <HeaderIcon
                    isClosed={!isOpen}
                    isDisabled={isDisabled || false}
                    tone={props.tone}
                    size={'medium'}
                  />
                )}
                <Spacings.Inline alignItems="baseline" scale={scale}>
                  <HeadLineText header={props.header} condensed={condensed} />
                  {props.secondaryHeader && (
                    <Text.Detail tone="secondary" truncate={true}>
                      {props.secondaryHeader}
                    </Text.Detail>
                  )}
                </Spacings.Inline>
              </Spacings.Inline>
              {props.headerControls && (
                <HeaderControlsWrapper
                  onClick={(event) => event.stopPropagation()}
                >
                  {props.headerControls}
                </HeaderControlsWrapper>
              )}
            </HeaderContainer>
            <div style={containerStyles}>
              <SectionWrapper
                // @ts-ignore
                ref={registerContentNode}
                condensed={condensed}
                isExpandControlHidden={props.hideExpansionControls}
              >
                {props.description && (
                  <SectionDescriptionWrapper>
                    <Text.Detail tone="secondary">
                      {props.description}
                    </Text.Detail>
                  </SectionDescriptionWrapper>
                )}
                <Spacings.Stack scale={scale}>
                  <SectionContent
                    id={panelContentId}
                    role="region"
                    aria-labelledby={panelButtonId}
                    hidden={!isOpen}
                  >
                    {props.children}
                  </SectionContent>
                </Spacings.Stack>
              </SectionWrapper>
            </div>
          </div>
        </Constraints.Horizontal>
      )}
    </CollapsibleMotion>
  );
};

/**
 * @deprecated This function is no longer supported.
 */
CollapsiblePanel.getPanelContentId = () => '';
CollapsiblePanel.displayName = 'CollapsiblePanel';
CollapsiblePanel.Header = CollapsiblePanelHeader;

export default CollapsiblePanel;
