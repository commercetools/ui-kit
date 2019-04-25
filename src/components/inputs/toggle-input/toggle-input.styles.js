import styled from '@emotion/styled';
import vars from '../../../../materials/custom-properties';

const toggleButtonSizes = {
  small: {
    height: '13px',
    width: '13px',
  },
  big: {
    height: '26px',
    width: '26px',
  },
};

const toggleBarSizes = {
  small: {
    height: '16px',
    width: '32px',
  },
  big: {
    height: '32px',
    width: '64px',
  },
};

export const Button = styled.div`
  position: absolute;

  left: 2px;
  transform: translateY(-50%);
  top: 50%;

  background-color: ${vars.colorSurface};
  box-shadow: ${vars.shadow7};
  border-radius: 50%;
  z-index: 1;
  transition: transform 0.2s;

  ${props =>
    props.isChecked &&
    `
      transform: ${
        props.size === 'small'
          ? 'translate(117%, -50%)'
          : 'translate(127%, -50%)'
      };
    `}

  ${props =>
    props.isDisabled &&
    `
    background-color: ${vars.colorAccent95};
  `}

  ${props =>
    props.isDisabled &&
    props.isChecked &&
    `
      background-color: ${vars.colorNeutral};
    `}

  ${props =>
    props.size === 'small'
      ? `
          height: ${toggleButtonSizes.small.height};
          width: ${toggleButtonSizes.small.width};
        `
      : `
        height: ${toggleButtonSizes.big.height};
        width: ${toggleButtonSizes.big.width};
      `}
`;

export const Toggle = styled.div`
  position: relative;
  display: inline-flex;

  ${props =>
    props.size === 'small'
      ? `
      height: ${toggleBarSizes.small.height};
      width: ${toggleBarSizes.small.width};
      `
      : `
      height: ${toggleBarSizes.big.height};
      width: ${toggleBarSizes.big.width};
  `}

  ${props =>
    !props.isDisabled &&
    `
    &:hover ${Button} {
      filter: drop-shadow(${vars.shadow15First})
        drop-shadow(${vars.shadow15Second});
    }
    `}
`;

export const Track = styled.div`
  position: absolute;
  left: 0;
  border-radius: 16px;
  box-shadow: ${vars.shadow9};
  background-color: ${vars.colorNeutral60};

  ${props =>
    props.isChecked &&
    `
      background-color: ${vars.colorPrimary};
    `}
  ${props =>
    props.isDisabled &&
    `
      box-shadow: none;
      background-color: ${vars.colorNeutral};
    `}

  ${props =>
    props.isDisabled &&
    props.isChecked &&
    `
      background-color: ${vars.colorPrimary25};
    `}


  ${props =>
    props.size === 'small'
      ? `
       height: ${toggleBarSizes.small.height};
       width: ${toggleBarSizes.small.width};
   `
      : `
      height: ${toggleBarSizes.big.height};
      width: ${toggleBarSizes.big.width};

      `}
`;
