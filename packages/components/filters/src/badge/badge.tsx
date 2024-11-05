import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

export type TBadgeProps = {
  /**
   * CSS ID for badge, used to specify relationship with parent in parent's `aria-controls` property
   * see https://www.w3.org/TR/wai-aria-1.1/#status
   */
  id: string;
  /**
   * If `true`, indicates that the element is in a disabled state.
   */
  isDisabled?: boolean;
  /**
   * String to be displayed in badge, generally a count of some kind
   */
  label: string;

  /**
   * Optional descriptive explanation of label (e.g. "+4 additional filters applied")
   */
  ['aria-label']?: string;
};

const badgeStyles = css`
  font-size: ${designTokens.fontSize20};
  font-weight: ${designTokens.fontWeight500};
  line-height: ${designTokens.lineHeight20};
  color: ${designTokens.colorSurface};
  background-color: ${designTokens.colorInfo};
  padding: 0 calc(${designTokens.spacing05} + ${designTokens.spacing10});
  border-radius: ${designTokens.borderRadius20};
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${designTokens.spacing40};
`;

const disabledBadgeStyles = css`
  background-color: ${designTokens.colorNeutral};
`;

function Badge(props: TBadgeProps) {
  return (
    <span
      aria-label={props['aria-label']}
      css={[badgeStyles, props.isDisabled && disabledBadgeStyles]}
      id={props.id}
      role="status"
    >
      {props.label}
    </span>
  );
}

export default Badge;
