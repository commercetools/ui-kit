import type { LocationDescriptor } from 'history';
import { ReactNode, MouseEvent, KeyboardEvent } from 'react';
import { css, type SerializedStyles } from '@emotion/react';
import { Link } from 'react-router-dom';
import { designTokens } from '@commercetools-uikit/design-system';
import Constraints from '@commercetools-uikit/constraints';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { CloseBoldIcon } from '@commercetools-uikit/icons';
import TagBody from './tag-body';

export type TTagProps = {
  /**
   * Indicates color scheme of the tag.
   */
  type?: 'normal' | 'warning';
  /**
   * Styles object that is spread into the tag body.
   */
  styles?: Record<string, SerializedStyles>;
  /**
   * Link of the tag when not disabled
   */
  to?: string | LocationDescriptor;
  /**
   * Disable the tag element along with the option to remove it.
   */
  isDisabled?: boolean;
  /**
   * Adds the draggable icon on the left side.
   */
  isDraggable?: boolean;
  /**
   * Called when remove button is clicked.
   */
  onRemove?: (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
  ) => void;
  /**
   * Called when tag element is clicked. This is not called when remove button is clicked.
   */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /**
   * Horizontal size limit of the input field.
   */
  horizontalConstraint?:
    | 1
    | 2
    | 3
    | 4
    | 5
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
  /**
   * Content rendered within the tag
   */
  children: ReactNode;
};

const defaultProps: Pick<
  TTagProps,
  'type' | 'isDisabled' | 'isDraggable' | 'horizontalConstraint'
> = {
  type: 'normal',
  isDisabled: false,
  isDraggable: false,
  horizontalConstraint: 'scale',
};

const Tag = (props: TTagProps) => {
  const linkProps =
    props.to && !props.isDisabled ? { as: Link, to: props.to } : {};
  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <div
        css={css`
          a {
            cursor: pointer;
            text-decoration: none;
          }
          cursor: default;
          min-width: 0;
          display: flex;
          background-color: ${props.type === 'warning'
            ? designTokens.backgroundColorForTagWarning
            : designTokens.backgroundColorForTag};

          ${props.onClick &&
          `&:hover {
            background-color: ${
              props.type === 'warning'
                ? designTokens.backgroundColorForTagWarning
                : designTokens.backgroundColorForTagWhenHovered
            };
          }`}
        `}
      >
        <TagBody
          {...linkProps}
          styles={props.styles}
          type={props.type}
          onClick={props.onClick}
          onRemove={props.onRemove}
          isDisabled={props.isDisabled}
          isDraggable={props.isDraggable}
        >
          {props.children}
        </TagBody>

        {Boolean(props.onRemove) && !props.isDisabled && (
          <AccessibleButton
            label="Remove"
            isDisabled={props.isDisabled}
            onClick={props.onRemove}
            css={[
              css`
                border-color: ${props.type === 'warning'
                  ? designTokens.colorWarning
                  : designTokens.borderColorForTag};
                padding: 0 ${designTokens.spacing25};
                border-radius: 0 ${designTokens.borderRadiusForTag}
                  ${designTokens.borderRadiusForTag} 0;
                display: flex;
                align-items: center;
                background: inherit;
                border-style: solid;
                border-width: 1px 1px 1px 0;
                :not(:disabled)&:hover,
                :not(:disabled)&:focus {
                  border-color: ${props.type === 'warning'
                    ? designTokens.colorWarning
                    : designTokens.borderColorForTagWhenHovered};

                  fill: ${designTokens.colorError};
                }
                fill: ${designTokens.colorNeutral40};
                &:disabled {
                  fill: ${designTokens.colorNeutral60};
                }
              `,
            ]}
          >
            <CloseBoldIcon size="medium" />
          </AccessibleButton>
        )}
      </div>
    </Constraints.Horizontal>
  );
};

Tag.defaultProps = defaultProps;
Tag.displayName = 'Tag';

export default Tag;
