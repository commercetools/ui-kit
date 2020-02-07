# Card

#### Description

Cards are used to display content and actions on a single topic.

#### Usage

```js
import Card from '@commercetools-uikit/card';

<Card theme="light" type="raised">
  <p>You'll never guess where I've been!</p>
</Card>;
```

#### Properties

| Props       | Type     | Required | Values           | Default  | Description                       |
| ----------- | -------- | :------: | ---------------- | -------- | --------------------------------- |
| `theme`     | `string` |    -     | `light`, `dark`  | `light`  | background color of the card      |
| `type`      | `string` |    -     | `raised`, `flat` | `raised` | The type of card                  |
| `classname` | `string` |    -     | -                | -        | className passed to the container |
| `children`  | `node`   |    ✅    | -                | -        | Content rendered within the card  |
