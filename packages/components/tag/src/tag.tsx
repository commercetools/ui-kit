import type { LocationDescriptor } from 'history';
import { ReactNode, MouseEvent, KeyboardEvent, ElementType } from 'react';
import { css, type SerializedStyles } from '@emotion/react';
import { Link } from 'react-router-dom';
import { designTokens } from '@commercetools-uikit/design-system';
import Constraints from '@commercetools-uikit/constraints';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { CloseBoldIcon } from '@commercetools-uikit/icons';
import TagBody from './tag-body';
import { getToneStyles } from './tag.styles';

export type TTagProps = {
  /**
   * Indicates color scheme of the tag.
   * @deprecated use `tone` instead
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
   * Horizontal size limit of the tag.
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
  /**
   * Indicates the color scheme of the tag.
   */
  tone?: 'primary' | 'warning' | 'surface';
};

const Tag = ({
  tone = 'primary',
  isDisabled = false,
  isDraggable = false,
  horizontalConstraint = 'scale',
  ...props
}: TTagProps) => {
  let tagBodyProps;

  switch (true) {
    case isDisabled:
      tagBodyProps = {};
      break;
    case Boolean(props.to):
      tagBodyProps = { as: Link, to: props.to };
      break;
    case Boolean(props.onClick):
      tagBodyProps = { as: 'button' as ElementType };
      break;
    default:
      tagBodyProps = {};
  }

  const isInteractive =
    !isDisabled && (Boolean(props.onClick) || Boolean(props.to));

  return (
    <Constraints.Horizontal max={horizontalConstraint}>
      <div
        css={css`
          a {
            text-decoration: none;
          }
          box-sizing: border-box;
          cursor: ${isDisabled
            ? 'not-allowed'
            : isInteractive
            ? 'pointer'
            : 'default'};
          min-width: 0;
          display: flex;
          border-radius: ${designTokens.borderRadius20};
          border-style: solid;
          border-width: 1px;
          user-select: none;
          ${getToneStyles({
            isDisabled,
            tone,
            ...props,
          })};

          &:focus-within {
            outline: ${designTokens.borderWidth2} solid
              ${designTokens.colorPrimary40};
          }
        `}
      >
        <TagBody
          {...tagBodyProps}
          styles={props.styles}
          onClick={props.onClick}
          onRemove={props.onRemove}
          isDisabled={isDisabled}
          isDraggable={isDraggable}
        >
          {props.children}
        </TagBody>

        {Boolean(props.onRemove) && !isDisabled && (
          <AccessibleButton
            label="Remove"
            isDisabled={isDisabled}
            onClick={props.onRemove}
            css={[
              css`
                align-items: center;
                border-radius: ${designTokens.borderRadius20};
                display: flex;
                fill: ${designTokens.colorNeutral40};
                padding: 0 ${designTokens.spacing25};

                &:disabled {
                  fill: ${designTokens.colorNeutral60};
                }

                &:focus-visible {
                  outline: ${designTokens.borderWidth2} solid
                    ${designTokens.colorPrimary40};
                  outline-offset: calc(-1 * ${designTokens.borderWidth2});
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

Tag.displayName = 'Tag';

export default Tag;
