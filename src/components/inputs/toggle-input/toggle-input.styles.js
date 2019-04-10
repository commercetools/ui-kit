import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const toggleSwitchSizes = {
  small: {
    height: '16px',
    width: '32px',
  },
  big: {
    height: '32px',
    width: '64px',
  },
};
const toggleButtonSizes = {
  small: {
    height: '16px',
    width: '16px',
  },
  big: {
    height: '32px',
    width: '32px',
  },
};
const toggleBarSizes = {
  small: {
    height: '12px',
    width: '32px',
  },
  big: {
    height: '24px',
    width: '64px',
  },
};

const getToggleSwitchStyles = props => {
  const baseStyles = [
    css`
      &:hover > * {
        filter: drop-shadow(${vars.shadow15First})
          drop-shadow(${vars.shadow15Second});
      }
    `,
    props.isDisabled &&
      css`
        &:hover > * {
          filter: none;
        }
      `,
  ];
  switch (props.size) {
    case 'small':
      return [
        ...baseStyles,
        css`
          position: relative;
          height: ${toggleSwitchSizes.small.height};
          width: ${toggleSwitchSizes.small.width};
        `,
      ];
    case 'big':
      return [
        ...baseStyles,
        css`
          position: relative;
          height: ${toggleSwitchSizes.big.height};
          width: ${toggleSwitchSizes.big.width};
        `,
      ];
    default:
      return baseStyles;
  }
};

const getToggleButtonStyles = props => {
  const baseStyles = [
    css`
      position: absolute;
      z-index: 1;
      filter: drop-shadow(${vars.shadow11First})
        drop-shadow(${vars.shadow11Second});
      transition: ${vars.transitionStandard};

      svg .bt-fill {
        transition: ${vars.transitionStandard};
      }
    `,
    props.isChecked &&
      css`
        /* The extra 7% shifts the button to the right by about 2px for big and 1px for small */
        transform: translateX(107%);
        filter: drop-shadow(${vars.shadow12First});

        svg .bt-fill {
          fill: ${vars.colorPrimary};
        }
      `,
    props.isDisabled &&
      css`
        filter: drop-shadow(${vars.shadow13First});

        svg .bt-fill {
          fill: ${vars.colorNeutral90};
        }
      `,
    props.isChecked &&
      props.isDisabled &&
      css`
        filter: drop-shadow(${vars.shadow14First});

        svg .bt-fill {
          fill: ${vars.colorPrimary85};
        }
      `,
  ];
  switch (props.size) {
    case 'small':
      return [
        ...baseStyles,
        css`
          position: relative;
          height: ${toggleButtonSizes.small.height};
          width: ${toggleButtonSizes.small.width};
        `,
      ];
    case 'big':
      return [
        ...baseStyles,
        css`
          position: relative;
          height: ${toggleButtonSizes.big.height};
          width: ${toggleButtonSizes.big.width};
        `,
      ];
    default:
      return baseStyles;
  }
};

const getToggleBarStyles = props => {
  const baseStyles = [
    css`
      position: absolute;
      left: 0;
      rect {
        fill: ${vars.colorNeutral60};
      }
    `,
    props.isChecked &&
      css`
        rect {
          fill: ${vars.colorPrimary25};
        }
      `,
    props.isDisabled &&
      css`
        rect {
          fill: ${vars.colorAccent95};
        }
      `,
  ];
  switch (props.size) {
    case 'small':
      return [
        ...baseStyles,
        css`
          top: 2px;
          height: ${toggleBarSizes.small.height};
          width: ${toggleBarSizes.small.width};
        `,
      ];
    case 'big':
      return [
        ...baseStyles,
        css`
          top: 4px;
          height: ${toggleBarSizes.big.height};
          width: ${toggleBarSizes.big.width};
        `,
      ];
    default:
      return baseStyles;
  }
};

export { getToggleSwitchStyles, getToggleButtonStyles, getToggleBarStyles };
