import vars from '../../../materials/custom-properties';

const getTextColor = ({ type }) => {
  if (type === 'info') {
    return vars.colorNavy;
  }
  return vars.colorBlack;
};

const getBorderColor = ({ type }) => {
  switch (type) {
    case 'info':
      return vars.colorGreen;
    case 'warning':
      return vars.colorOrange;
    case 'error':
      return vars.colorRed;
    default:
      return '';
  }
};

const getOffsetMargin = ({ placement }) => {
  const position = (placement && placement.split('-')[0]) || '';
  switch (position) {
    case 'left':
    case 'right':
      return `0 ${vars.spacing4}`;
    case 'top':
    case 'bottom':
      return `${vars.spacing4} 0`;
    default:
      return '';
  }
};

const getMaxWidth = ({ constraint }) => {
  switch (constraint) {
    case 'xs':
      return vars.constraintXs;
    case 's':
      return vars.constraintS;
    case 'm':
      return vars.constraintM;
    case 'l':
      return vars.constraintL;
    case 'xl':
      return vars.constraintXl;
    case 'scale':
    default:
      return vars.constraintScale;
  }
};

// here we use object styles so we can spread these
// with the styles we get from react-popper :D
// eslint-disable-next-line import/prefer-default-export
export const getBodyStyles = ({ constraint, placement, type }) => ({
  fontFamily: vars.fontFamilyDefault,
  borderRadius: vars.borderRadius6,
  padding: `${vars.spacing4} ${vars.spacing8}`,
  margin: getOffsetMargin({ placement }),
  border: `1px solid ${getBorderColor({ type })}`,
  boxShadow: `0 0 2px 0 rgba(0, 0, 0, 0.12), 0 3px 3px 0 rgba(0, 0, 0, 0.24)`,
  verticalAlign: 'middle',
  fontSize: '0.857rem',
  maxWidth: getMaxWidth({ constraint }),
  // so hovering over the tooltip when the tooltip overlaps the component
  pointerEvents: 'none',
  color: getTextColor({ type }),
  backgroundColor: vars.colorWhite,
});
