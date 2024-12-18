import { type ReactElement, cloneElement } from 'react';
import {
  filterAriaAttributes,
  filterDataAttributes,
} from '@commercetools-uikit/utils';
import InlineSvg from '../inline-svg/inline-svg';
import { getCustomIconStyles } from './custom-icon.styles';

export type TCustomIconProps = {
  /**
   * Indicates the size of the component
   */
  size?: '10' | '20' | '30' | '40';
  /**
   * Indicates whether the component should display a border
   */
  hasBorder?: boolean;
  /**
   * An <Icon /> component, must pass either an icon prop or an svg prop
   */
  icon: ReactElement | string;
};

const CustomIcon = ({
  size = '20',
  hasBorder = true,
  ...props
}: TCustomIconProps) => (
  <div
    role="img"
    css={getCustomIconStyles({
      size,
      hasBorder,
      ...props,
    })}
    {...filterDataAttributes({
      size,
      hasBorder,
      ...props,
    })}
    {...filterAriaAttributes({
      size,
      hasBorder,
      ...props,
    })}
  >
    {typeof props.icon === 'string' ? (
      <InlineSvg data={props.icon} size={'scale'} />
    ) : (
      cloneElement(props.icon)
    )}
  </div>
);

CustomIcon.displayName = 'CustomIcon';

export default CustomIcon;
