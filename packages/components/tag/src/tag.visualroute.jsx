import { Tag } from '@commercetools-frontend/ui-kit';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { Suite, Spec } from '../../../../test/percy';

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
metus ultrices, interdum augue eget, consequat orci. Nam et nisi
eleifend, fermentum nunc non, sagittis tortor. Pellentesque vulputate
dignissim leo fermentum vehicula. Fusce efficitur est molestie augue
ullamcorper dictum. Donec non leo a augue dictum pretium. Praesent ac
quam pharetra, posuere mauris in, pharetra nisi.`;

export const routePath = '/tag';

const basePropsToList = ['type', 'horizontalConstraint', 'isDisabled'];

export const component = () => (
  <Suite>
    <Spec label="Normal">
      <Tag type="normal">Tag</Tag>
    </Spec>
    <Spec label="Normal - onRemove">
      <Tag type="normal" onRemove={() => {}}>
        With remove
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - 1">
      <Tag type="normal" horizontalConstraint={1}>
        Tag
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - 3">
      <Tag type="normal" horizontalConstraint={3}>
        Tag
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - 7">
      <Tag type="normal" horizontalConstraint={7}>
        Tag
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - 10">
      <Tag type="normal" horizontalConstraint={10}>
        Tag
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - 16">
      <Tag type="normal" horizontalConstraint={16}>
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
      label="Normal - with to - horizontalConstraint - 1"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar" horizontalConstraint={1}>
        Tag
      </Tag>
    </Spec>
    <Spec
      label="Normal - with to - horizontalConstraint - 3"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar" horizontalConstraint={3}>
        Tag
      </Tag>
    </Spec>
    <Spec
      label="Normal - with to - horizontalConstraint - 7"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar" horizontalConstraint={7}>
        Tag
      </Tag>
    </Spec>
    <Spec
      label="Normal - with to - horizontalConstraint - 10"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar" horizontalConstraint={10}>
        Tag
      </Tag>
    </Spec>
    <Spec
      label="Normal - with to - horizontalConstraint - 16"
      propsToList={[...basePropsToList, 'to']}
    >
      <Tag type="normal" to="foo/bar" horizontalConstraint={16}>
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

    <Spec
      label="Dark theme - with to"
      propsToList={[...basePropsToList, 'to']}
      backgroundColor="black"
      listPropsOfNestedChild
    >
      <ThemeProvider scope="local" theme="vrtTag">
        <Tag type="normal" to="foo/bar">
          Tag
        </Tag>
      </ThemeProvider>
    </Spec>
  </Suite>
);
