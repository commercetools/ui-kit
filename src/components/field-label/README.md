# Fields: FieldLabel

#### Description

The FieldLabel component represents the label for a field in a form. This component can also be used to better explain an input field and to guide the user to fill a form.

#### Dos and don'ts

Recommended to be used in vertical forms. (E.g input field below the label, and not besides)

#### Usage

```js
import { FieldLabel } from '@commercetools-frontend/ui-kit';
```

#### Examples

```js
<FieldLabel
  title={<FormattedMessage {...messages.title} />}
  hasRequiredIndicator={true}
  onInfoButtonClick={() => {}} />}
  hint={<FormattedMessage {...messages.hint} />}
  hintIcon={<WarningIcon />}
  description={<FormattedMessage {...messages.description} />}
  badge={<FlatButton tone="primary" label="show" />}
  htmlFor="sampleInput"
  horizontalConstraint="m"
/>
```

The `hintIcon` also accepts a custom `theme` while defaulting to `orange` in the case above.

```diff
<FieldLabel
  title={<FormattedMessage {...messages.title} />}
  hasRequiredIndicator={true}
  onInfoButtonClick={() => {}} />}
  hint={<FormattedMessage {...messages.hint} />}
- hintIcon={<WarningIcon />}
+ hintIcon={<WarningIcon theme="green" />}
  description={<FormattedMessage {...messages.description} />}
  badge={<FlatButton tone="primary" label="show" />}
  htmlFor="sampleInput"
  horizontalConstraint="m"
/>
```

#### Properties

| Props                  | Type               | Required | Values                             | Default | Description                                                                                                                                                                                                                                                           |
| ---------------------- | ------------------ | :------: | ---------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                | `string` or `node` |    ✅    | -                                  | -       | Title of the label                                                                                                                                                                                                                                                    |
| `onInfoButtonClick`    | `function`         |    -     | -                                  | -       | Function called when info button is pressed. Info button will only be visible when this prop is passed.                                                                                                                                                               |
| `hint`                 | `string` or `node` |    -     | -                                  | -       | Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`. |
| `hintIcon`             | `node`             |    -     | -                                  | -       | Icon to be displayed beside the hint text. Will only get rendered when `hint` is passed as well.                                                                                                                                                                      |
| `description`          | `string` or `node` |    -     | -                                  | -       | Provides a description for the title.                                                                                                                                                                                                                                 |
| `badge`                | `node`             |    -     | -                                  | -       | Badge to be displayed beside the label. Might be used to display additional information about the content of the field (E.g verified email)                                                                                                                           |
| `hasRequiredIndicator` | `bool`             |    -     | -                                  | `false` | Indicates if the labeled field is required in a form                                                                                                                                                                                                                  |
| `htmlFor`              | `string`           |    -     | -                                  | -       | ID of the labeled input                                                                                                                                                                                                                                               |
| `horizontalConstraint` | `string`           |          | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the label.                                                                                                                                                                                                                                   |

#### `hint` vs `description`

Most fields will only use the `description` which provides more information about what the entered value will be used for.

The `hint` however is used to show additional information about the value the user enters. It can show the allowed characters. It can also show whether the entered value has errors (like a reference no longer existing in an attribute) when the form is loaded for the first time.

Neither of them should be used for form validation.
