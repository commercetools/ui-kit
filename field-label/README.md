# Fields: FieldLabel

#### Description

The FieldLabel component represents the label for a field in a form. This component can also be used to better explain an input field and to guide the user to fill a form.

#### Dos and don'ts

Recommended to be used in vertical forms. (E.g input field below the label, and not besides)

#### Usage

```js
import FieldLabel from '@commercetools-frontend/ui-kit/field-label';
```

#### Examples

```js
<FieldLabel
  title={<FormattedMessage {...messages.title} />}
  hasRequiredIndicator={true}
  button={<IconButton icon={<InformationIcon />} />}
  hint={<FormattedMessage {...messages.hint} />}
  hintIcon={<WarningIcon />}
  description={<FormattedMessage {...messages.description} />}
  badge={<FlatButton tone="primary" label="show" />}
  htmlFor="sampleInput"
/>
```

#### Properties

| Props                  | Type               | Required | Values | Default | Description                                                                                                                                                                                                                                                            |
| ---------------------- | ------------------ | :------: | ------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                | `string` or `node` |    ✅    | -      | -       | Title of the label                                                                                                                                                                                                                                                     |
| `button`               | `node`             |    -     | -      | -       | IconButton to be displayed beside the label title                                                                                                                                                                                                                      |
| `hint`                 | `string` or `node` |    -     | -      | -       | Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (`E.g warn about uniqueness of a field, when it can only be set once`), whereas `description` can describe it in more depth. Can also receive a `hintIcon. |
| `hintIcon`             | `node`             |    -     | -      | -       | Icon to be displayed beside the label hint                                                                                                                                                                                                                             |
| `description`          | `string` or `node` |    -     | -      | -       | Provides a description for the title.                                                                                                                                                                                                                                  |
| `badge`                | `node`             |    -     | -      | -       | Badge to be displayed beside the label. Might be used to display additional information about the content of the field (E.g verified email)                                                                                                                            |
| `hasRequiredIndicator` | `bool`             |    -     | -      | `false` | Indicates if the labeled field is required in a form                                                                                                                                                                                                                   |  |
| `htmlFor`              | `string`           |    -     | -      | -       | ID of the labeled input                                                                                                                                                                                                                                                |
