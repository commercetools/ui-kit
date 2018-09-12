import PropTypes from 'prop-types';
import React from 'react';
import Text from '../typography/text';
import Spacings from '../spacings';
import styles from './loading-spinner.mod.css';

const circlePath =
  'M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z';
const pointerPath =
  'M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z';
const scaleClassMap = {
  s: 'small',
  l: 'large',
};

const LoadingSpinner = props => (
  <Spacings.Inline alignItems="center">
    <div className={styles[`container-${scaleClassMap[props.scale]}`]}>
      <svg
        className={styles[`svg-${scaleClassMap[props.scale]}`]}
        viewBox="0 0 40 40"
      >
        <path className={styles.circle} d={circlePath} />
        <path className={styles.pointer} d={pointerPath} />
      </svg>
    </div>
    {props.children && (
      <Text.Detail tone="secondary">{props.children}</Text.Detail>
    )}
  </Spacings.Inline>
);
LoadingSpinner.displayName = 'LoadingSpinner';
LoadingSpinner.defaultProps = {
  scale: 'l',
};
LoadingSpinner.propTypes = {
  scale: PropTypes.oneOf(['s', 'l']).isRequired,
  children: PropTypes.node,
};

export default LoadingSpinner;
