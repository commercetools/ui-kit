import { Fragment, cloneElement, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import {
  components as defaultComponents,
  SingleValueProps,
  PlaceholderProps,
} from 'react-select';

export type TWrapperWithIconProps = {
  type: string;
  selectProps: TSelectProps;
} & SingleValueProps &
  PlaceholderProps;

const getDefaultComponent = (type: TWrapperWithIconProps['type']) => {
  if (type === 'singleValue') return defaultComponents.SingleValue;
  if (type === 'placeholder') return defaultComponents.Placeholder;
  return Fragment;
};

type TSelectProps = {
  iconLeft: ReactElement;
};

const WrapperWithIcon = (props: TWrapperWithIconProps) => {
  const Component = getDefaultComponent(props.type);

  return (
    <>
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
        <Component {...props}>{props.children}</Component>
      </span>
    </>
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
  SingleValue: (props: TWrapperWithIconProps) => (
    <WrapperWithIcon {...props} type="singleValue" />
  ),
  Placeholder: (props: TWrapperWithIconProps) => (
    <WrapperWithIcon {...props} type="placeholder" />
  ),
};
/* eslint-enable react/display-name */

export { customComponents };
