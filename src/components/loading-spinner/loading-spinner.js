import PropTypes from 'prop-types';
import React from 'react';
import { css, keyframes } from '@emotion/core';
import Text from '../typography/text';
import Spacings from '../spacings';
import vars from '../../../materials/custom-properties';

const sizeLargeSvg = '32px';
const sizeSmallSvg = '18px';
const positionOrigin = '20px';

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

const LoadingSpinner = props => {
  const size = props.scale === 's' ? sizeSmallSvg : sizeLargeSvg;
  return (
    <Spacings.Inline alignItems="center">
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
              fill: ${vars.colorNavy};
              opacity: 0.2;
            `}
            d={circlePath}
          />
          <path
            css={css`
              animation: ${spin} 0.5s infinite linear;
              fill: ${vars.colorNavy};
              transform-origin: ${positionOrigin} ${positionOrigin} 0;
            `}
            d={pointerPath}
          />
        </svg>
      </div>
      {props.children && (
        <Text.Detail tone="secondary">{props.children}</Text.Detail>
      )}
    </Spacings.Inline>
  );
};
LoadingSpinner.displayName = 'LoadingSpinner';
LoadingSpinner.defaultProps = {
  scale: 'l',
};
LoadingSpinner.propTypes = {
  scale: PropTypes.oneOf(['s', 'l']).isRequired,
  children: PropTypes.node,
};

export default LoadingSpinner;
