import { type ReactElement, cloneElement } from 'react';
import {
  filterAriaAttributes,
  filterDataAttributes,
  warning,
} from '@commercetools-uikit/utils';
import InlineSvg from '../inline-svg/inline-svg';
import { getLeadingIconStyles } from './leading-icon.styles';

export type TLeadingIconProps = {
  /**
   * Indicates the color theme of the component
   */
  color?: 'white' | 'neutral' | 'purple' | 'turquoise' | 'accent' | 'brown';
  /**
   * Indicates the size of the component
   */
  size?: '10' | '20' | '30' | '40';
  /**
   * Indicates whether the color theme is inverted, if `true` icon fill is white over a dark background of the selected color
   */
  isInverted?: boolean;
  /**
   * An <Icon /> component, must pass either an icon prop or an svg prop
   */
  icon?: ReactElement;
  /**
   * Custom SVG to be displayed, must pass either an svg prop or an icon prop
   */
  svg?: string;
};

const defaultProps: Required<
  Pick<TLeadingIconProps, 'color' | 'size' | 'isInverted'>
> = {
  color: 'neutral',
  size: '20',
  isInverted: false,
};

const LeadingIcon = (props: TLeadingIconProps) => {
  if (!props.svg && !props.icon) {
    warning(
      false,
      'LeadingIcon: you must pass either an icon or svg prop to the LeadingIcon component'
    );
    return null;
  }

  return (
    <div
      role="img"
      css={getLeadingIconStyles(props)}
      {...filterDataAttributes(props)}
      {...filterAriaAttributes(props)}
    >
      {props.svg ? (
        <InlineSvg data={props.svg} size={'scale'} />
      ) : (
        props.icon &&
        cloneElement(props?.icon, {
          size: 'scale',
        })
      )}
    </div>
  );
};

LeadingIcon.displayName = 'LeadingIcon';
LeadingIcon.defaultProps = defaultProps;

export default LeadingIcon;
