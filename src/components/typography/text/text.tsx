import React from 'react';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import {
  bodyStyles,
  detailStyles,
  headlineStyles,
  subheadlineStyles,
  wrapStyles,
} from './text.styles';

type ElementTypeOfHeadline = 'h1' | 'h2' | 'h3';
type HeadlineProps = {
  elementType: ElementTypeOfHeadline;
  title?: string;
  truncate?: boolean;
  children: React.ReactNode;
};

const Headline: React.FC<HeadlineProps> = props => {
  const HeadlineElement = props.elementType;
  return (
    <HeadlineElement
      css={headlineStyles(props)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      {props.children}
    </HeadlineElement>
  );
};

Headline.displayName = 'TextHeadline';

type ElementTypeOfSubheadline = 'h4' | 'h5';
type ToneOfSubheadline =
  | 'primary'
  | 'secondary'
  | 'information'
  | 'positive'
  | 'negative';
type SubheadlineProps = {
  elementType: ElementTypeOfSubheadline;
  isBold?: boolean;
  tone?: ToneOfSubheadline;
  title?: string;
  truncate?: boolean;
  children: React.ReactNode;
};

const Subheadline: React.FC<SubheadlineProps> = props => {
  const SubheadlineElement = props.elementType;
  return (
    <SubheadlineElement
      title={props.title}
      css={subheadlineStyles(props)}
      {...filterDataAttributes(props)}
    >
      {props.children}
    </SubheadlineElement>
  );
};

Subheadline.displayName = 'TextSubheadline';

type WrapProps = {
  title?: string;
  children: React.ReactNode;
};

const Wrap: React.FC<WrapProps> = props => (
  <div css={wrapStyles()} title={props.title} {...filterDataAttributes(props)}>
    {props.children}
  </div>
);

Wrap.displayName = 'TextWrap';

type ToneOfBody =
  | 'primary'
  | 'secondary'
  | 'information'
  | 'positive'
  | 'negative'
  | 'inverted';
type BodyProps = {
  isBold?: boolean;
  isItalic?: boolean;
  isInline?: boolean;
  tone?: ToneOfBody;
  title?: string;
  truncate?: boolean;
  children: React.ReactNode;
};

const Body: React.FC<BodyProps> = props =>
  props.isInline ? (
    <span
      css={bodyStyles(props)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      {props.children}
    </span>
  ) : (
    <p
      css={bodyStyles(props)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      {props.children}
    </p>
  );

Body.displayName = 'TextBody';

type ToneOfDetail =
  | 'primary'
  | 'secondary'
  | 'information'
  | 'positive'
  | 'negative'
  | 'inverted';
type DetailProps = {
  isBold?: boolean;
  isItalic?: boolean;
  isInline?: boolean;
  tone?: ToneOfDetail;
  title?: string;
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Detail: React.FC<DetailProps> = props => (
  <small
    title={props.title}
    css={detailStyles(props)}
    className={props.className}
    {...filterDataAttributes(props)}
  >
    {props.children}
  </small>
);

Detail.displayName = 'TextDetail';

export default {
  Body,
  Detail,
  Headline,
  Subheadline,
  Wrap,
};
