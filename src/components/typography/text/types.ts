export type ElementTypeOfHeadline = 'h1' | 'h2' | 'h3';
export type HeadlineProps = {
  elementType: ElementTypeOfHeadline;
  title?: string;
  truncate?: boolean;
  children: React.ReactNode;
};

export type ElementTypeOfSubheadline = 'h4' | 'h5';
export type ToneOfSubheadline =
  | 'primary'
  | 'secondary'
  | 'information'
  | 'positive'
  | 'negative';
export type SubheadlineProps = {
  elementType: ElementTypeOfSubheadline;
  isBold?: boolean;
  tone?: ToneOfSubheadline;
  title?: string;
  truncate?: boolean;
  children: React.ReactNode;
};

export type WrapProps = {
  title?: string;
  children: React.ReactNode;
};

export type ToneOfBody =
  | 'primary'
  | 'secondary'
  | 'information'
  | 'positive'
  | 'negative'
  | 'inverted';
export type BodyProps = {
  isBold?: boolean;
  isItalic?: boolean;
  isInline?: boolean;
  tone?: ToneOfBody;
  title?: string;
  truncate?: boolean;
  children: React.ReactNode;
};

export type ToneOfDetail =
  | 'primary'
  | 'secondary'
  | 'information'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'inverted';
export type DetailProps = {
  isBold?: boolean;
  isItalic?: boolean;
  isInline?: boolean;
  tone?: ToneOfDetail;
  title?: string;
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
};
