import { ReactNode, useState, useEffect } from 'react';
import { css, keyframes } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import Inline from '@commercetools-uikit/spacings-inline';

const circlePath =
  'M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z';
const pointerPath =
  'M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const sizePerScale = {
  s: '18px',
  l: '32px',
};

const positionOrigin = '20px';

export type TLoadingSpinnerProps = {
  /**
   * Set the amount of time to delay the loading spinner before it renders.
   * The default value of is 1000ms.
   */
  maxDelayDuration?: number;
  /**
   * Set the size of the loading spinner.
   */
  scale: 's' | 'l';
  /**
   * The content rendered inside the `LoadingSpinner`.
   */
  children?: ReactNode;
};

const LoadingSpinner = ({
  scale = 'l',
  maxDelayDuration = 1000,
  ...props
}: TLoadingSpinnerProps) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const size = sizePerScale[scale];
  useEffect(() => {
    const delaySpinnerTimeout = setTimeout(
      () => setShowSpinner(true),
      maxDelayDuration
    );

    return () => clearTimeout(delaySpinnerTimeout);
  }, [maxDelayDuration]);

  if (!showSpinner && (maxDelayDuration ?? 0) > 0) return null;

  return (
    <Inline alignItems="center">
      <div
        css={css`
          width: ${size};
          height: ${size};
        `}
      >
        <svg
          css={css`
            width: ${size};
            height: ${size};
          `}
          viewBox="0 0 40 40"
        >
          <path
            css={css`
              fill: ${designTokens.colorPrimary90};
              opacity: 0.2;
            `}
            d={circlePath}
          />
          <path
            css={css`
              animation: ${spin} 0.5s infinite linear;
              fill: ${designTokens.colorPrimary};
              transform-origin: ${positionOrigin} ${positionOrigin} 0;
            `}
            d={pointerPath}
          />
        </svg>
      </div>
      {props.children && (
        <Text.Detail tone="secondary">{props.children}</Text.Detail>
      )}
    </Inline>
  );
};
LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
