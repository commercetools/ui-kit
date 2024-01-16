import styled from '@emotion/styled';
import type { ReactElement } from 'react';
import InlineSvg from '../inline-svg';

type TLeadingIconProps = {
  color?: 'white' | 'neutral' | 'purple' | 'turquoise' | 'accent' | 'brown';
  size?: '10' | '20' | '30' | '40';
  icon?: ReactElement;
  svg?: string;
  isInverted?: boolean;
};

const defaultProps = {
  color: 'neutral',
  size: '20',
  isInverted: false,
};

const backgroundColorsMap: Record<string, string> = {
  transparent: 'transparent',
  white: '#FFFFFF',
  neutral: '#E1E2EA',
  purple: '#DAD6F5',
  turquoise: '#D6F5F5',
  accent: '#DCE9EF',
  brown: '#F5E8D6',
};

const foregroundColorsMap: Record<string, string> = {
  transparent: 'inherit',
  white: '#878BAB',
  neutral: '#545878',
  purple: '#6459A6',
  turquoise: '#59A6A5',
  accent: '#42788A',
  brown: '#A68659',
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props: TLeadingIconProps) => {
    return Boolean(props.icon)
      ? backgroundColorsMap[props.color || defaultProps.color]
      : 'transparent';
  }};
  border: ${(props: TLeadingIconProps) =>
    Boolean(props.svg) || props.color === 'white'
      ? '1px solid #E1E2EA'
      : 'auto'};
  border-radius: 4px;
  width: 64px;
  height: 64px;
  padding: 5px;
  & svg {
    scale: ${(props: TLeadingIconProps) => (Boolean(props.icon) ? '2' : '1')};
    fill: ${(props: TLeadingIconProps) => {
      return Boolean(props.icon)
        ? `${foregroundColorsMap[props.color || defaultProps.color]}`
        : 'inherit';
    }}
`;

function LeadingIcon(props: TLeadingIconProps) {
  // const svgElement = useStringToReactElement(props.svg || '');

  console.log({
    backgroundColor: backgroundColorsMap[props.color || defaultProps.color],
    foregroundColor: foregroundColorsMap[props.color || defaultProps.color],
  });

  return (
    <Container {...props}>
      {props.svg ? <InlineSvg data={props.svg} /> : props.icon}
    </Container>
  );
}

LeadingIcon.defaultProps = defaultProps;

export default LeadingIcon;
