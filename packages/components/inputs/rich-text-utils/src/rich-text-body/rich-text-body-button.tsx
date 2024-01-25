import omit from 'lodash/omit';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { ReactNode, MouseEvent, KeyboardEvent } from 'react';

export type TRichTextBodyButtonProps = {
  isDisabled?: boolean;
  label: string;
  isActive?: boolean;
  isReadOnly?: boolean;
  children: ReactNode;
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
};

const propsToOmit = ['isActive', 'label', 'isDisabled', 'isReadOnly'];

function getFillColor(props: TRichTextBodyButtonProps) {
  if (props.isActive) return designTokens.colorSurface;
  return designTokens.colorSolid;
}

const RichTextBodyButton = (props: TRichTextBodyButtonProps) => {
  const restOfProps = omit(props, propsToOmit);

  return (
    <button
      {...restOfProps}
      type="button"
      tabIndex={-1}
      aria-disabled={props.isDisabled}
      disabled={props.isDisabled}
      aria-label={props.label}
      css={[
        css`
          border: 0;
          cursor: pointer;
          background: ${props.isActive
            ? designTokens.backgroundColorForLocalizedRichTextBodyButtonWhenActive
            : 'transparent'};
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: ${designTokens.spacing10};
          padding: ${designTokens.spacing20};
          margin: 0 ${designTokens.spacing05} ${designTokens.spacing20}
            ${designTokens.spacing05};

          &:focus {
            outline: none;
          }

          &:hover,
          &:focus {
            background: ${props.isActive
              ? designTokens.backgroundColorForLocalizedRichTextBodyButtonWhenActive
              : designTokens.backgroundColorForLocalizedRichTextBodyButton};
          }

          svg {
            fill: ${getFillColor(props)};
          }

          &:disabled {
            pointer-events: none;
            svg {
              fill: ${designTokens.colorNeutral60};
            }
          }
        `,
        props.isReadOnly &&
          css`
            svg {
              fill: ${designTokens.colorNeutral60};
            }
          `,
      ]}
    >
      {props.children}
    </button>
  );
};

RichTextBodyButton.displayName = 'RichTextInputButton';

export default RichTextBodyButton;
