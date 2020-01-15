# Tags

## Usage

```js
import { Tag } from '@commercetools-frontend/ui-kit';
```

#### Description

A tag is often used for items that need to be labeled or categorized. This might apply to search terms or categories of a product. Tags can also have a "remove" button.

#### Usage

```js
<Tag
  type="normal"
  isDisabled={false}
  to="/project-key/products/foo"
  onRemove={() => {}}
>
  Icecream
</Tag>
```

#### Properties

| Props                  | Type     | Required | Values                             | Default  | Description                                                        |
| ---------------------- | -------- | :------: | ---------------------------------- | -------- | ------------------------------------------------------------------ |
| `type`                 | `string` |    -     | `normal`, `warning`                | `normal` | Indicates color scheme of the tag                                  |
| `styles.body`          | `object` |    -     | -                                  | -        | Styles spread onto the tag body                                    |
| `linkTo`               | `string` |    -     | -                                  | -        | Location the tag links to when enabled                             |
| `isDisabled`           | `bool`   |    -     | -                                  | `false`  | Disables the tag and the option to remove                          |
| `onRemove`             | `func`   |    -     | -                                  | -        | Called when remove is clicked                                      |
| `onClick`              | `func`   |    -     | -                                  | -        | Called when tag is clicked (but not when remove button is clicked) |
| `horizontalConstraint` | `object` |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale`  | Horizontal size limit of the input field.                          |
| `children`             | `node`   |    ✅    | -                                  | -        | Content rendered within the tag                                    |

#### Where to use

Main Functions and use cases are:

- Adding something to a set _example: Adding products to categories_

- Remove from a set _example: Removing products from categories_

- Showing a set _example: List of categories a product is in_
