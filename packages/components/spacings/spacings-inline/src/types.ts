// @TODO extract this into a shared file
export type TAlignItem =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  // Deprecated
  | 'flexStart'
  | 'flexEnd';

export type TJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type TScale = 'xs' | 's' | 'm' | 'l' | 'xl';

export type TProps = {
  scale?: TScale;
  alignItems?: TAlignItem;
  justifyContent?: TJustifyContent;
  children?: React.ReactNode;
};
