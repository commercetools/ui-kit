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

// here we use object styles so we can spread these
// with the styles we get from react-popper :D
// eslint-disable-next-line import/prefer-default-export
export const getBodyStyles = ({ type }) => ({
  fontFamily: vars.fontFamilyDefault,
  borderRadius: '5px',
  padding: '6px',
  margin: '6px',
  border: `1px solid ${getBorderColor({ type })}`,
  boxShadow: `0 0 2px 0 rgba(0, 0, 0, 0.12), 0 3px 3px 0 rgba(0, 0, 0, 0.24)`,
  verticalAlign: 'middle',
  fontSize: '0.857rem',
  color: getTextColor({ type }),
  backgroundColor: vars.colorWhite,

  "&[aria-hidden='true']": {
    opacity: '0.01',
  },
});
