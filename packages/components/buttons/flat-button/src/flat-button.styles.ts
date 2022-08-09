import type { TFlatButtonProps, CustomProperties } from './flat-button';

export const getButtonIconColor = (
  props: Pick<TFlatButtonProps, 'isDisabled' | 'tone'>
) => {
  if (props.isDisabled) return 'neutral60';
  else if (props.tone === 'primary') return 'primary';
  else if (props.tone === 'secondary') return 'solid';
  else if (props.tone === 'inverted') return 'surface';
  return 'solid';
};

export const getTextColor = (
  tone: TFlatButtonProps['tone'],
  isHover: boolean = false,
  customProperties: CustomProperties
): string => {
  switch (tone) {
    case 'primary':
      return isHover
        ? customProperties.colorPrimary25
        : customProperties.colorPrimary;
    case 'secondary':
      return customProperties.colorSolid;
    case 'inverted':
      return customProperties.fontColorForTextWhenInverted;
    default:
      return 'inherit';
  }
};
