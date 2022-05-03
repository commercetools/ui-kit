import omit from 'lodash/omit';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import type { ReactNode, MouseEvent, KeyboardEvent } from 'react';

type TRichTextBodyButtonProps = {
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
  if (props.isActive) return vars.colorSurface;
  return vars.colorSolid;
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
          background: ${props.isActive ? vars.colorAccent30 : 'transparent'};
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: ${vars.spacingXs};
          padding: ${vars.spacingXs};

          &:focus {
            outline: none;
          }

          &:hover,
          &:focus {
            background: ${props.isActive
              ? vars.colorAccent30
              : vars.colorNeutral90};
          }

          svg {
            fill: ${getFillColor(props)};
          }

          &:disabled {
            pointer-events: none;
            svg {
              fill: ${vars.colorNeutral60};
            }
          }
        `,
        props.isReadOnly &&
          css`
            svg {
              fill: ${vars.colorNeutral60};
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
