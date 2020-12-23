import React from 'react';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Headline, Subheadline, Body, Detail, Wrap } from '../src';

const InlineColorWrapper = styled.div`
  background-color: #e1ffdd;
  display: inline-block;
  width: ${(props) => props.width};
`;

export default {
  title: 'Components/Text/All',
  subcomponents: {
    Headline,
    Subheadline,
    Body,
    Detail,
    Wrap,
  },
};

const TemplateAll = (args) => (
  <SpacingsStack>
    <Headline as="h1" title="Headline H1" truncate={args.truncate}>
      {'Headline H1'}
    </Headline>
    <Headline as="h2" title="Headline H2" truncate={args.truncate}>
      {'Headline H2'}
    </Headline>
    <Headline as="h3" title="Headline H3" truncate={args.truncate}>
      {'Headline H3'}
    </Headline>
    <Subheadline
      as="h4"
      title="Subheadline H4"
      truncate={args.truncate}
      isBold={args.isBold}
      tone={args.tone}
    >
      {'Subheadline H4'}
    </Subheadline>
    <Subheadline
      as="h5"
      title="Subheadline H5"
      truncate={args.truncate}
      isBold={args.isBold}
      tone={args.tone}
    >
      {'Subheadline H5'}
    </Subheadline>
    <Body
      as="p"
      title="Body p"
      truncate={args.truncate}
      isBold={args.isBold}
      isItalic={args.isItalic}
      tone={args.tone}
    >
      {'Body p'}
    </Body>
    <Detail
      title="Detail p"
      truncate={args.truncate}
      isBold={args.isBold}
      isItalic={args.isItalic}
      isInline={args.isInline}
      tone={args.tone}
    >
      {'Detail'}
    </Detail>
  </SpacingsStack>
);
const TemplateWrap = (args) => (
  <InlineColorWrapper width={'200px'}>
    <Wrap title={args.title}>{args.title}</Wrap>
  </InlineColorWrapper>
);

export const Default = TemplateAll.bind({});
Default.args = {};
