import { Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import { components as defaultComponents } from 'react-select';

const getDefaultComponent = (type) => {
  if (type === 'singleValue') return defaultComponents.SingleValue;
  if (type === 'placeholder') return defaultComponents.Placeholder;
  return Fragment;
};

const WrapperWithIcon = ({ children, ...props }) => {
  const Component = getDefaultComponent(props.type);

  return (
    <Fragment>
      {props.selectProps.iconLeft &&
        cloneElement(props.selectProps.iconLeft, {
          size: 'big',
        })}
      <span
        // react-select uses absolute positioning for the SingleValue/Placeholder
        // the icon has a fixed size of 24px (== SpacingsXl), therefore we can use a fixed margin
        // spacingsXs is the margin between the icon and value
        css={css`
          margin-left: ${customProperties.spacingXl +
          customProperties.spacingXs};
        `}
      >
        <Component {...props}>{children}</Component>
      </span>
    </Fragment>
  );
};
WrapperWithIcon.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['singleValue', 'placeholder']),
  selectProps: PropTypes.shape({
    iconLeft: PropTypes.node,
  }),
};
WrapperWithIcon.displayName = 'WrapperWithIcon';

export default WrapperWithIcon;

/* eslint-disable react/display-name */
const customComponents = {
  SingleValue: (props) => <WrapperWithIcon {...props} type="singleValue" />,
  Placeholder: (props) => <WrapperWithIcon {...props} type="placeholder" />,
};
/* eslint-enable react/display-name */

export { customComponents };
