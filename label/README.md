# Fields: Label

#### Description

The Label component represents the primitive label for a field. Its made to be used with form fields. This component can also indicate if the field is Required or not, and give emphasis by being bold.

#### Do's and don'ts

In order to improve readability, using `inverted` tone is recommended on dark backgrounds (E.g in a table header)

#### Usage

```js
import Label from '@commercetools-frontend/ui-kit/fields/label';
```

#### Examples

```js
<Label
  value={<FormattedMessage {...messages.title} />}
  isRequired={true}
  isBold={false}
  tone="inverted"
/>
```

#### Properties

| Props        | Type     | Required | Values                    | Default | Description                                          |
| ------------ | -------- | :------: | ------------------------- | ------- | ---------------------------------------------------- |
| `value`      | `node`   |    ✅    | -                         | -       | Value of the label                                   |
| `isRequired` | `bool`   |    -     | -                         | `false` | Indicates if the labeled field is required in a form |  |
| `isBold`     | `bool`   |    -     | -                         | `false` | Indicates if the label title should be in bold text  |
| `tone`       | `string` |    -     | `['primary', 'inverted']` | \_      | Indicates the tone to be applied to the label        |
| `htmlFor`    | `string` |    -     | -                         | -       | ID of the labeled input                              |
