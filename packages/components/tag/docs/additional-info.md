# TagList

## Description

A `TagList` component is used as wrapper for the list of tags. It has predefined spacings and flex display so that tags are grouped next to each other.

## Usage

The `<TagList>` component accepts `<Tag>` element as `children` props.
Here's the example how to use them:

```jsx
import { Tag, TagList } from '@commercetools-uikit/tag';

const Example = () => (
  <TagList>
    {['apple', 'orange'].map((tag, index) => (
      <Tag key={index}>{tag}</Tag>
    ))}
  </TagList>
);

export default Example;
```
