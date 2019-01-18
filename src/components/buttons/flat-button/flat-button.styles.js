import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const primary = `
  p {
    color: ${vars['--color-green']};
  }
  &:hover p {
    color: ${vars['--color-green-25']};
  }
`;

const secondary = `
  p {
    color: ${vars['--color-black']};
  }
`;

const disabled = `
  p {
    color: ${vars['--color-gray']};
  }
  &:hover p {
    color: ${vars['--color-gray']};
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const getStyles = props => css`
  display: flex;
  align-items: center;
  font-size: 1rem;
  border: none;
  background: none;
  padding: 0;
  min-height: initial;

  > * + * {
    margin: 0 0 0 ${vars['--spacing-4']};
  }

  ${props.tone && props.tone === 'primary' && primary}
  ${props.tone && props.tone === 'secondary' && secondary}
  ${props.isDisabled && disabled}
`;
