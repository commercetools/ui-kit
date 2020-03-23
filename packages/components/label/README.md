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

| Props                        | Type     | Required | Values                    | Default | Description                                          |
| ---------------------------- | -------- | :------: | ------------------------- | ------- | ---------------------------------------------------- |
| `tone`                       | `string` |    -     | `['primary', 'inverted']` | \_      | Indicates the tone to be applied to the label        |
| `children`                   | `node`   |    ✅    | -                         | -       | Value of the label                                   |
| `isBold`                     | `bool`   |    -     | -                         | `false` | Indicates if the label title should be in bold text  |
| `isRequiredIndicatorVisible` | `bool`   |    -     | -                         | `false` | Indicates if the labeled field is required in a form |  |
| `htmlFor`                    | `string` |    -     | -                         | -       | ID of the labeled input                              |
