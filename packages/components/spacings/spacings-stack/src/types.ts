export type TAlignItem =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  // Deprecated
  | 'flexStart'
  | 'flexEnd';

export type TScale = 'xs' | 's' | 'm' | 'l' | 'xl';

export type TProps = {
  scale?: TScale;
  alignItems?: TAlignItem;
  children?: React.ReactNode;
};
