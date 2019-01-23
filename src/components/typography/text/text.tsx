import React from 'react';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import {
  bodyStyles,
  detailStyles,
  headlineStyles,
  subheadlineStyles,
  wrapStyles,
} from './text.styles';
import {
  HeadlineProps,
  SubheadlineProps,
  WrapProps,
  BodyProps,
  DetailProps,
} from './types';

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

const Wrap: React.FC<WrapProps> = props => (
  <div css={wrapStyles()} title={props.title} {...filterDataAttributes(props)}>
    {props.children}
  </div>
);
Wrap.displayName = 'TextWrap';

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

const Text = {
  Body,
  Detail,
  Headline,
  Subheadline,
  Wrap,
};

export default Text;
