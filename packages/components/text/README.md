# Typography: Text

## Description

The `Text` component implements the typography elements such as headings, paragraphs, etc.

## `<Text.Headline>`

Wraps the given text in the given HTML header `size`.

### Usage

```js
import Text from '@commercetools-uikit/text';

<Text.Headline as="h1">{'The title'}</Text.Headline>;
```

### Properties

| Props         | Type             | Required | Values               | Default | Description                                                                               |
| ------------- | ---------------- | :------: | -------------------- | ------- | ----------------------------------------------------------------------------------------- |
| `as`          | `String`         |    ✅    | `['h1', 'h2', 'h3']` | -       | -                                                                                         |
| `children`    | `PropTypes.node` | ✅ (\*)  | -                    | -       | -                                                                                         |
| `intlMessage` | `intl message`   | ✅ (\*)  | -                    | -       | An `intl` message object that will be rendered with `FormattedMessage`                    |
| `id`          | `String`         |    -     | -                    | -       | Used as HTML id property                                                                  |
| `title`       | `String`         |    -     | -                    | -       | Text to show in a tooltip on hover over the element                                       |
| `truncate`    | `Bool`           |    -     | -                    | `false` | Option for truncate content in case the screen has small width                            |
| `nowrap`      | `Bool`           |    -     | -                    | `false` | The content in the element will not be wrapped to a new line unless explicitly specified. |

> `*`: `children` is required only if `intlMessage` is not provided

The component further forwards all `data-` attributes to the underlying component.

### Where to use

Title of pages.

## `<Text.Subheadline>`

Wraps the given text in the given HTML header `size`.

### Usage

```js
import Text from '@commercetools-uikit/text';

<Text.Subheadline as="h4">{'The subtitle'}</Text.Subheadline>;
```

### Properties

| Props         | Type             | Required | Values                                                                        | Default |                                                                                           |
| ------------- | ---------------- | :------: | ----------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------- |
| `as`          | `String`         |    ✅    | `['h4', 'h5']`                                                                | -       |                                                                                           |
| `id`          | `String`         |    -     | -                                                                             | -       | Used as HTML id property                                                                  |
| `isBold`      | `Boolean`        |    -     | -                                                                             | `false` |                                                                                           |
| `tone`        | `String`         |    -     | `['primary', 'secondary', 'tertiary', 'information', 'positive', 'negative']` | -       |                                                                                           |
| `children`    | `PropTypes.node` | ✅ (\*)  | -                                                                             | -       |                                                                                           |
| `intlMessage` | `intl message`   | ✅ (\*)  | -                                                                             | -       | An `intl` message object that will be rendered with `FormattedMessage`                    |
| `title`       | `String`         |    -     | -                                                                             | -       |                                                                                           |
| `truncate`    | `Bool`           |    -     | -                                                                             | `false` |                                                                                           |
| `nowrap`      | `Bool`           |    -     | -                                                                             | `false` | The content in the element will not be wrapped to a new line unless explicitly specified. |

> `*`: `children` is required only if `intlMessage` is not provided

The component further forwards all `data-` attributes to the underlying component.

### Where to use

Subtitle of pages.

## `<Text.Wrap>`

Wraps the given text in its container. And for long text, text will be wrapped to new line.

### Usage

```js
import Text from '@commercetools-uikit/text';

<Text.Wrap>{'Sooo long text'}</Text.Wrap>;
```

### Where to use

When we render value that may be vey long, and we prefer to wrap text to new line after it exceeds its wrapper's width.

## `<Text.Body>`

Wraps the given text in a `<p>` element, for normal content.

### Usage

```js
import Text from '@commercetools-uikit/text';

<Text.Body>{'This is a content'}</Text.Body>;
```

### Properties

| Props             | Type             | Required | Values                                                                                     | Default   |                                                                                           |
| ----------------- | ---------------- | :------: | ------------------------------------------------------------------------------------------ | --------- | ----------------------------------------------------------------------------------------- |
| `as`              | `String`         |    -     | `['p', 'span']`                                                                            | -         |                                                                                           |
| `id`              | `String`         |    -     | -                                                                                          | -         | Used as HTML id property                                                                  |
| `isBold`          | `Boolean`        |    -     | -                                                                                          | `false`   | This prop is being deprecated in favor of the `fontWeight` prop                           |
| `fontWeight`      | `String`         |    -     | `['regular', 'medium', 'bold']`                                                            | `regular` |                                                                                           |
| `isItalic`        | `Boolean`        |    -     | -                                                                                          | `false`   |                                                                                           |
| `isStrikethrough` | `Boolean`        |    -     | -                                                                                          | `false`   |                                                                                           |
| `tone`            | `String`         |    -     | `['primary', 'secondary',  'tertiary', 'information', 'positive', 'negative', 'inverted']` | -         |                                                                                           |
| `children`        | `PropTypes.node` | ✅ (\*)  | -                                                                                          | -         |                                                                                           |
| `intlMessage`     | `intl message`   | ✅ (\*)  | -                                                                                          | -         | An `intl` message object that will be rendered with `FormattedMessage`                    |
| `title`           | `String`         |    -     | -                                                                                          | -         |                                                                                           |
| `truncate`        | `Bool`           |    -     | -                                                                                          | `false`   |                                                                                           |
| `nowrap`          | `Bool`           |    -     | -                                                                                          | `false`   | The content in the element will not be wrapped to a new line unless explicitly specified. |

> `*`: `children` is required only if `intlMessage` is not provided

The component further forwards all `data-` attributes to the underlying component.

### Where to use

Content text in general.

## `<Text.Detail>`

Wraps the given text in a `<small>` semantic tag. It accepts a `tone` prop to
properly style the text.

### Usage

```js
import Text from '@commercetools-uikit/text';

<Text.Detail>{'This would be something small'}</Text.Detail>
<Text.Detail tone="secondary">{'This would be something small with the secondary tone applied'}</Text.Detail>
```

### Properties

| Props             | Type             | Required | Values                                                                                     | Default   |                                                                                           |
| ----------------- | ---------------- | :------: | ------------------------------------------------------------------------------------------ | --------- | ----------------------------------------------------------------------------------------- |
| `as`              | `string`         |    -     | `['small', 'span']` `[^]`                                                                  | `false`   |                                                                                           |
| `id`              | `String`         |    -     | -                                                                                          | -         | Used as HTML id property                                                                  |
| `isBold`          | `Boolean`        |    -     | -                                                                                          | `false`   | This prop is being deprecated in favor of the `fontWeight` prop                           |
| `fontWeight`      | `String`         |    -     | `['regular', 'medium', 'bold']`                                                            | `regular` |                                                                                           |
| `isItalic`        | `Boolean`        |    -     | -                                                                                          | `false`   |                                                                                           |
| `isStrikethrough` | `Boolean`        |    -     | -                                                                                          | `false`   |                                                                                           |
| `tone`            | `String`         |    -     | `['primary', 'secondary',  'tertiary', 'information', 'positive', 'negative', 'warning'']` | -         |                                                                                           |
| `children`        | `PropTypes.node` | ✅ (\*)  | -                                                                                          | -         |                                                                                           |
| `intlMessage`     | `intl message`   | ✅ (\*)  | -                                                                                          | -         | An `intl` message object that will be rendered with `FormattedMessage`                    |
| `title`           | `String`         |    -     | -                                                                                          | -         |                                                                                           |
| `truncate`        | `Bool`           |    -     | -                                                                                          | `false`   |                                                                                           |
| `aria-labelledby` | `String`         |    -     | -                                                                                          | -         | HTML ID of an element containing the label for the text rendered in this component        |
| `nowrap`          | `Bool`           |    -     | -                                                                                          | `false`   | The content in the element will not be wrapped to a new line unless explicitly specified. |

> `*`: `children` is required only if `intlMessage` is not provided.
> `[^]`: Use `as` prop to render an inline element.

The component further forwards all `data-` attributes to the underlying component.

### Where to use

Details text of form boxes.

## `<Text.Caption>`

Wraps the text in the smallest available font size and accepts `tone` and `fontWeight` props.

### Usage

```js
import Text from '@commercetools-uikit/text';

<Text.Caption as="h4">{'The caption'}</Text.Caption>;
```

### Properties

| Props             | Type             | Required | Values                                                                                                                   | Default   |                                                                                           |
| ----------------- | ---------------- | :------: | ------------------------------------------------------------------------------------------------------------------------ | --------- | ----------------------------------------------------------------------------------------- | --- | ---------- | --------- | --- | --- | ------- | --- |
| `id`              | `String`         |    -     | -                                                                                                                        | -         | Used as HTML id property                                                                  |     | `isItalic` | `Boolean` | -   | -   | `false` |     |
| `isStrikethrough` | `Boolean`        |    -     | -                                                                                                                        | `false`   |                                                                                           |
| `tone`            | `String`         |    -     | `['primary',  'secondary','tertiary', 'information', 'positive','negative', 'critical', 'inherit','warning','inverted']` | -         |
| `fontWeight`      | `String`         |    -     | `['regular', 'medium', 'bold']`                                                                                          | `regular` |                                                                                           |
| `truncate`        | `Bool`           |    -     | -                                                                                                                        | `false`   |                                                                                           |
| `nowrap`          | `Bool`           |    -     | -                                                                                                                        | `false`   | The content in the element will not be wrapped to a new line unless explicitly specified. |
| `aria-labelledby` | `String`         |    -     | -                                                                                                                        | -         | HTML ID of an element containing the label for the text rendered in this component        |
| `title`           | `String`         |    -     | -                                                                                                                        | -         |                                                                                           |
| `children`        | `PropTypes.node` | ✅ (\*)  | -                                                                                                                        | -         |                                                                                           |
| `intlMessage`     | `intl message`   | ✅ (\*)  | -                                                                                                                        | -         | An `intl` message object that will be rendered with `FormattedMessage`                    |

> `*`: `children` is required only if `intlMessage` is not provided.

### Where to use

Text.Caption is the smallest available font size in our design system. From the visual hierarchy perspective, it sits on the last spot of the importance scale and therefor should be used sparingly only in specific situations:

- The text does not have high importance and is not crucial to complete a task.
- In an information dense UI where using a bigger font size would harm the visual hierarchy of the page.
- For small descriptive labels, or tooltips, that provide helpful additional information in a given context.
- Text.Caption should not be used in text paragraphs longer than 1-2 sentences.
