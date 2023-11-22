import type { CSSProperties, LegacyRef } from 'react';
import type { ClearIndicatorProps } from 'react-select';
import { css } from '@emotion/react';
import { useIntl } from 'react-intl';
import { designTokens } from '@commercetools-uikit/design-system';
import { CloseIcon } from '@commercetools-uikit/icons';
import messages from './messages';

type TInnerProps = {
  ref: LegacyRef<HTMLButtonElement>;
} & JSX.IntrinsicElements['button'];

export type TClearIndicatorProps = {
  innerProps: TInnerProps;
} & ClearIndicatorProps;

const ClearIndicator = (props: TClearIndicatorProps) => {
  const intl = useIntl();
  const {
    getStyles,
    innerProps: { ref, onMouseDown, ...restInnerProps },
  } = props;
  return (
    <button
      {...restInnerProps}
      ref={ref}
      css={css`
        border: none;
        cursor: pointer;
        background: none;
        box-sizing: border-box;
        text-decoration: none;
        fill: ${designTokens.fontColorForClearInputIcon};
        :hover svg * {
          fill: ${designTokens.fontColorForClearInputIconWhenHovered};
        }
      `}
      style={getStyles('clearIndicator', props) as CSSProperties}
      title={intl.formatMessage(messages.clearButtonLabel)}
      aria-label={intl.formatMessage(messages.clearButtonLabel)}
      // overriding the default `aria-hidden` prop value to make the component accessible by keyboard - https://github.com/JedWatson/react-select/issues/4793
      aria-hidden={false}
      // only onMouseDown and onTouchEnd event handlers are passed by `react-select` to the component by default, which makes it not accessible by keyboard
      onClick={onMouseDown}
    >
      <CloseIcon size="medium" />
    </button>
  );
};

ClearIndicator.displayName = 'ClearIndicator';

export default ClearIndicator;
