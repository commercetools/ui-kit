import type {
  TSingleValueWrapperWithIconProps as SingleValueWrapperWithIconProps,
  TPlaceholderWrapperWithIconProps as PlaceholderWrapperWithIconProps,
  TWrapperWithIconProps as WrapperWithIconProps,
  TDefaultComponent as DefaultComponent,
} from './wrapper-with-icon';

export type TSingleValueWrapperWithIconProps = SingleValueWrapperWithIconProps;
export type TPlaceholderWrapperWithIconProps = PlaceholderWrapperWithIconProps;
export type TDefaultComponent = DefaultComponent<'singleValue' | 'placeholder'>;
export type TWrapperWithIconProps = WrapperWithIconProps<
  'singleValue' | 'placeholder'
>;
