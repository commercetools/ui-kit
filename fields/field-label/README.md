# Fields: FieldLabel

#### Description

The FieldLabel component represents the label for a field in a form. This component can also be used to better explain an input field and to guide the user to fill the form.

#### Do's and don'ts

Recommended to be used in vertical forms. (E.g input field below the label, and not besides)

#### Usage

```js
import FieldLabel from '@commercetools-frontend/ui-kit/forms/field-label';
```

#### Examples

```js
<FieldLabel
  title={<FormattedMessage {...messages.title} />}
  hint={<FormattedMessage {...messages.hint} />}
  description={<FormattedMessage {...messages.description} />}
  button={<IconButton icon={<InformationIcon />} />}
  hintIcon={<WarningIcon />}
  badge={<FlatButton tone="primary" label="show" />}
  isRequired={true}
  isBold={false}
  tone="inverted"
  htmlFor="sampleInput"
/>
```

#### Properties

| Props                  | Type               | Required | Values                    | Default | Description                                                                                                                                 |
| ---------------------- | ------------------ | :------: | ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                | `string` or `node` |    ✅    | -                         | -       | Title of the label                                                                                                                          |
| `hint`                 | `string` or `node` |    -     | -                         | -       | Hint for the label. Provides supplementary information for the title. Can also receive a `hintIcon`                                         |
| `description`          | `string` or `node` |    -     | -                         | -       | Provides a description for the title.                                                                                                       |
| `button`               | `node`             |    -     | -                         | -       | IconButton to be displayed beside the label title                                                                                           |
| `hintIcon`             | `node`             |    -     | -                         | -       | Icon to be displayed beside the label hint                                                                                                  |
| `badge`                | `node`             |    -     | -                         | -       | Badge to be displayed beside the label. Might be used to display additional information about the content of the field (E.g verified email) |
| `hasRequiredIndicator` | `bool`             |    -     | -                         | `false` | Indicates if the labeled field is required in a form                                                                                        |  |
| `isBold`               | `bool`             |    -     | -                         | `false` | Indicates if the label title should be in bold text                                                                                         |
| `tone`                 | `string`           |    -     | `['primary', 'inverted']` | \_      | Indicates the tone to be applied to the label title                                                                                         |
| `htmlFor`              | `string`           |    -     | -                         | -       | ID of the labeled input                                                                                                                     |
