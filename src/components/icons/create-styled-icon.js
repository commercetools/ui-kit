import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import styled from '@emotion/styled';
import vars from '../../../materials/custom-properties';

const iconSizes = {
  small: 12,
  medium: 16,
  big: 24,
};

const getSizeStyle = size => {
  switch (size) {
    case 'scale':
      return `
        &:not(:root) {
          width: 100%;
          height: auto;
        }
      `;
    case 'small':
    case 'medium':
    case 'big':
      return `
        width: ${iconSizes[size]}px;
        height: ${iconSizes[size]}px;
      `;
    default:
      return `
        width: ${iconSizes.big}px;
        height: ${iconSizes.big}px;
      `;
  }
};

const capitalize = s => s[0].toUpperCase() + s.slice(1);

const getColor = (color, theme) => {
  if (!color) return 'inherit';
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  const iconColor = overwrittenVars[`color${capitalize(color)}`];

  if (!iconColor) {
    invariant(
      color,
      `ui-kit/Icon: the specified color '${color}' is not supported.`
    );
    return 'inherit';
  }

  return iconColor;
};

export default function createStyledIcon(Component, displayName) {
  const StyledComponent = styled(Component)(
    props => `
    * {
      fill: ${getColor(props.color, props.theme)};
    }
    ${getSizeStyle(props.size)}
  `
  );
  StyledComponent.displayName = displayName;
  StyledComponent.propTypes = {
    color: PropTypes.oneOf([
      'solid',
      'neutral60',
      'surface',
      'info',
      'primary',
      'primary40',
      'warning',
      'error',
    ]),
    size: PropTypes.oneOf(['small', 'medium', 'big', 'scale']),
  };
  return StyledComponent;
}
