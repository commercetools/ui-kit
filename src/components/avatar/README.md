# Avatar

#### Description

A component for rendering profile images

## Usage

```js
import { Avatar } from '@commercetools-frontend/ui-kit';

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
| `gravatarHash`  | `string` |    ✅    | -                     | -       | Hash of the image to be showed                   |
| `firstName`     | `string` |          | -                     | ''      | First name of the user in case there is no image |
| `lastName`      | `string` |          | -                     | ''      | Last name of the user in case there is no image  |
| `scale`         | `string` |    ✅    | oneOf(['s', 'm', 'l]) | `s`     | The size of the Avatar component.                |
| `isHighlighted` | `bool`   |    -     | -                     | `false` | Highlights the Avatar                            |
