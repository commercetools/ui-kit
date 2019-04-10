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

const getColor = theme => {
  if (!theme) return 'inherit';
  switch (theme) {
    case 'black':
      return vars.colorSolid;
    case 'grey':
      return vars.colorNeutral60;
    case 'white':
      return vars.colorSurface;
    case 'blue':
      return vars.colorInfo;
    case 'green':
      return vars.colorPrimary;
    case 'green-light':
      return vars.colorPrimary40;
    case 'orange':
      return vars.colorWarning;
    case 'red':
      return vars.colorError;
    default: {
      invariant(
        theme,
        `ui-kit/Icon: the specified theme '${theme}' is not supported.`
      );
      return 'inherit';
    }
  }
};

export default function createStyledIcon(Component, displayName) {
  const StyledComponent = styled(Component)(
    props => `
    * {
      fill: ${getColor(props.theme)};
    }
    ${getSizeStyle(props.size)}
  `
  );
  StyledComponent.displayName = displayName;
  StyledComponent.propTypes = {
    theme: PropTypes.oneOf([
      'black',
      'grey',
      'white',
      'blue',
      'green',
      'green-light',
      'orange',
      'red',
    ]),
    size: PropTypes.oneOf(['small', 'medium', 'big', 'scale']),
  };
  return StyledComponent;
}
