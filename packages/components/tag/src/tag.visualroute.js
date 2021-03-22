import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Tag } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
metus ultrices, interdum augue eget, consequat orci. Nam et nisi
eleifend, fermentum nunc non, sagittis tortor. Pellentesque vulputate
dignissim leo fermentum vehicula. Fusce efficitur est molestie augue
ullamcorper dictum. Donec non leo a augue dictum pretium. Praesent ac
quam pharetra, posuere mauris in, pharetra nisi.`;

export const routePath = '/tag';

const basePropsToList = ['type', 'horizontalConstraint', 'isDisabled'];

export const component = ({ themes }) => (
  <Suite>
    <Spec label="Normal">
      <Tag type="normal">Tag</Tag>
    </Spec>
    <Spec label="Normal - onRemove">
      <Tag type="normal" onRemove={() => {}}>
        With remove
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - xs">
      <Tag type="normal" horizontalConstraint="xs">
        Tag
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - s">
      <Tag type="normal" horizontalConstraint="s">
        Tag
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - m">
      <Tag type="normal" horizontalConstraint="m">
        Tag
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - l">
      <Tag type="normal" horizontalConstraint="l">
        Tag
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - xl">
      <Tag type="normal" horizontalConstraint="xl">
        Tag
      </Tag>
    </Spec>

    <Spec label="Warning">
      <Tag type="warning">Warning message</Tag>
    </Spec>
    <Spec label="Warning - disabled">
      <Tag type="warning" isDisabled={true}>
        Warning but disabled
      </Tag>
    </Spec>
    <Spec label="Normal - multiple lines of text">
      <Tag type="normal">{longText}</Tag>
    </Spec>
    <Spec label="Normal - multiple lines of text - onRemove">
      <Tag type="normal" onRemove={() => {}}>
        {longText}
      </Tag>
    </Spec>
    <Spec label="Normal - onRemove (disabled)">
      <Tag type="normal" onRemove={() => {}} isDisabled={true}>
        {longText}
      </Tag>
    </Spec>
    <ThemeProvider
      theme={{ ...themes.darkTheme, colorNeutral95: 'rgba(0,0,0,0.05)' }}
    >
      <Spec label="with dark theme">
        <Tag type="normal">Tag</Tag>
      </Spec>
    </ThemeProvider>
    <Spec label="Normal - with to" propsToList={[...basePropsToList, 'to']}>
      <Tag type="normal" to="foo/bar">
        Tag
      </Tag>
    </Spec>
    <Spec
      label="Normal - with to - onRemove"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar" onRemove={() => {}}>
        With remove
      </Tag>
    </Spec>
    <Spec
      label="Normal - with to - horizontalConstraint - xs"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar" horizontalConstraint="xs">
        Tag
      </Tag>
    </Spec>
    <Spec
      label="Normal - with to - horizontalConstraint - s"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar" horizontalConstraint="s">
        Tag
      </Tag>
    </Spec>
    <Spec
      label="Normal - with to - horizontalConstraint - m"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar" horizontalConstraint="m">
        Tag
      </Tag>
    </Spec>
    <Spec
      label="Normal - with to - horizontalConstraint - l"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar" horizontalConstraint="l">
        Tag
      </Tag>
    </Spec>
    <Spec
      label="Normal - with to - horizontalConstraint - xl"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar" horizontalConstraint="xl">
        Tag
      </Tag>
    </Spec>
    <Spec label="Warning - with to" propsToList={[...basePropsToList, 'to']}>
      <Tag type="warning" to="foo/bar">
        Warning message
      </Tag>
    </Spec>
    <Spec
      label="Warning - with to - disabled"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="warning" to="foo/bar" isDisabled={true}>
        Warning but disabled
      </Tag>
    </Spec>
    <Spec
      label="Normal - with to - multiple lines of text"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar">
        {longText}
      </Tag>
    </Spec>
    <Spec
      label="Normal - with to - multiple lines of text - onRemove"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar" onRemove={() => {}}>
        {longText}
      </Tag>
    </Spec>
    <Spec
      label="Normal - with to - onRemove (disabled)"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar" onRemove={() => {}} isDisabled={true}>
        {longText}
      </Tag>
    </Spec>
    <ThemeProvider
      theme={{ ...themes.darkTheme, colorNeutral95: 'rgba(0,0,0,0.05)' }}
    >
      <Spec
        label="Dark theme - with to"
        propsToList={[...basePropsToList, 'to']}
      >
        <Tag type="normal" to="foo/bar">
          Tag
        </Tag>
      </Spec>
    </ThemeProvider>
  </Suite>
);
