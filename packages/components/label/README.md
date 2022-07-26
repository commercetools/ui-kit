# Forms: Label

## Description

The Label component represents the primitive label for a field. It's made to be used with form fields. This component can also indicate if the field is required or not, and give emphasis by being bold.

## Do's and don'ts

In order to improve readability, using `inverted` tone is recommended on dark backgrounds (E.g in a table header)

## Usage

```js
import Label from '@commercetools-uikit/label';

<Label
  isRequiredIndicatorVisible={true}
  isBold={false}
  tone="inverted"
/>
  <FormattedMessage {...messages.title} />
</Label>
```

## Properties

| Props                        | Type           | Required | Values                    | Default | Description                                                                                                     |
| ---------------------------- | -------------- | :------: | ------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- | --- |
| `tone`                       | `string`       |    -     | `['primary', 'inverted']` | \_      | Indicates the tone to be applied to the label                                                                   |
| `children`                   | `node`         | ✅ (\*)  | -                         | -       | Value of the label                                                                                              |
| `intlMessage`                | `intl message` | ✅ (\*)  | -                         | -       | An intl message object that will be rendered with `FormattedMessage`                                            |
| `isBold`                     | `bool`         |    -     | -                         | `false` | Indicates if the label title should be in bold text                                                             |
| `isRequiredIndicatorVisible` | `bool`         |    -     | -                         | `false` | Indicates if the labeled field is required in a form                                                            |     |
| `htmlFor`                    | `string`       |    -     | -                         | -       | The `for` HTML attribute, used to reference form elements with the related attribute `id` or `aria-labelledby`. |
| `id`                         | `string`       |    -     | -                         | -       | The `id` HTML attribute, used to reference non-form elements with the related attribute `aria-labelledby`.      |

> `*`: `children` is required only if `intlMessage` is not provided, and vice-versa
