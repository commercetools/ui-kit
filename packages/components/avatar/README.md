# Avatar

#### Description

A component for rendering profile images

## Usage

```js
import Avatar from '@commercetools-uikit/avatar';

<Avatar
  gravatarHash="20c9c1b252b46ab49d6f7a4cee9c3e68"
  firstName="John"
  lastName="Doe"
  size="s"
/>;
```

#### Properties

| Props           | Type     | Required | Values                | Default | Description                                      |
| --------------- | -------- | :------: | --------------------- | ------- | ------------------------------------------------ |
| `firstName`     | `string` |          | -                     | ''      | First name of the user in case there is no image |
| `lastName`      | `string` |          | -                     | ''      | Last name of the user in case there is no image  |
| `gravatarHash`  | `string` |    ✅    | -                     | -       | Hash of the image to be showed                   |
| `isHighlighted` | `bool`   |    -     | -                     | `false` | Highlights the Avatar                            |
| `size`          | `string` |    ✅    | oneOf(['s', 'm', 'l]) | `s`     | The size of the Avatar component.                |
