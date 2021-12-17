import type { CSSProperties, LegacyRef } from 'react';
import type { ClearIndicatorProps } from 'react-select';
import { css } from '@emotion/react';
import { useIntl } from 'react-intl';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { CloseIcon } from '@commercetools-uikit/icons';
import messages from './messages';

type TInnerProps = {
  ref: LegacyRef<HTMLButtonElement>;
} & JSX.IntrinsicElements['button'];

type TClearIndicator = {
  innerProps: TInnerProps;
} & ClearIndicatorProps;

const ClearIndicator = (props: TClearIndicator) => {
  const intl = useIntl();
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
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
        :hover svg * {
          fill: ${vars.colorWarning};
        }
      `}
      style={getStyles('clearIndicator', props) as CSSProperties}
      title={intl.formatMessage(messages.clearButtonLabel)}
      aria-label={intl.formatMessage(messages.clearButtonLabel)}
    >
      <CloseIcon color="solid" size="medium" />
    </button>
  );
};

ClearIndicator.displayName = 'ClearIndicator';

export default ClearIndicator;
