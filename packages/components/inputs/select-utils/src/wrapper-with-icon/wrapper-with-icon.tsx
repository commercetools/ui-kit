import { cloneElement, type ReactElement } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import {
  components as defaultComponents,
  type SingleValueProps,
  type PlaceholderProps,
} from 'react-select';

export type TWrapperWithIconSelectProps = {
  iconLeft?: ReactElement;
};
export type TSingleValueWrapperWithIconProps = {
  type: 'singleValue';
  selectProps?: TWrapperWithIconSelectProps;
} & SingleValueProps;
export type TPlaceholderWrapperWithIconProps = {
  type: 'placeholder';
  selectProps?: TWrapperWithIconSelectProps;
} & PlaceholderProps;
export type TWrapperWithIconProps<Type extends 'singleValue' | 'placeholder'> =
  Type extends 'singleValue'
    ? TSingleValueWrapperWithIconProps
    : Type extends 'placeholder'
    ? TPlaceholderWrapperWithIconProps
    : never;
export type TDefaultComponent<Type extends 'singleValue' | 'placeholder'> = (
  props: Type extends 'singleValue'
    ? SingleValueProps
    : Type extends 'placeholder'
    ? PlaceholderProps
    : never
) => JSX.Element;

const getDefaultComponent = <Type extends 'singleValue' | 'placeholder'>(
  type: TWrapperWithIconProps<Type>['type']
): TDefaultComponent<Type> | null => {
  if (type === 'singleValue')
    return defaultComponents.SingleValue as TDefaultComponent<Type>;
  if (type === 'placeholder')
    return defaultComponents.Placeholder as TDefaultComponent<Type>;
  return null;
};

const WrapperWithIcon = <Type extends 'singleValue' | 'placeholder'>(
  props: TWrapperWithIconProps<Type>
) => {
  const DefaultComponent = getDefaultComponent<Type>(props.type);

  if (!DefaultComponent) {
    return null;
  }

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
          margin-left: ${designTokens.marginLeftForSelectInputIcon};
        `}
      >
        {/* @ts-ignore */}
        <DefaultComponent {...props} />
      </span>
    </>
  );
};

WrapperWithIcon.displayName = 'WrapperWithIcon';

export default WrapperWithIcon;

const customComponents = {
  SingleValue: (props: TWrapperWithIconProps<'singleValue'>) => (
    <WrapperWithIcon<'singleValue'> {...props} type="singleValue" />
  ),
  Placeholder: (props: TWrapperWithIconProps<'placeholder'>) => (
    <WrapperWithIcon<'placeholder'> {...props} type="placeholder" />
  ),
};

export { customComponents };
