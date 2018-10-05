# LocalizedMultilineTextField

#### Description

A controlled text input component for localized multi-line strings with validation states.

## Usage

```js
import { LocalizedMultilineTextField } from '@commercetools-frontend/ui-kit';

<LocalizedMultilineTextField
  title="Description"
  value={{
    en: 'Parrot that knows how to party',
    de: 'Papagei der ordentlich abfeiert',
  }}
  selectedLanguage="en"
  onChange={event => alert(event.target.value)}
/>;
```

#### Properties

| Props                        | Type               | Required | Values                             | Default | Description                                                                                                                                                                                                                                                           |
| ---------------------------- | ------------------ | :------: | ---------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                         | `string`           |    -     | -                                  | -       | Used as HTML `id` property. An `id` is auto-generated when it is not specified.                                                                                                                                                                                       |
| `horizontalConstraint`       | `object`           |          | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                                                                                                                                            |
| `errors`                     | `object`           |    -     | -                                  | -       | A map of errors. Error messages for known errors are rendered automatically. Unknown errors will be forwarded to `renderError`.                                                                                                                                       |
| `errorsByLanguage`           | `object`           |    -     | -                                  | -       | Errors for each translation. These are forwarded to the `errors` prop of `LocalizedMultilineTextInput`.                                                                                                                                                               |
| `renderError`                | `function`         |    -     | -                                  | -       | Called with custom errors, as `renderError(key, error)`. This function can return a message which will be wrapped in an `ErrorMessage`. It can also return `null` to show no error.                                                                                   |
| `isRequired`                 | `bool`             |    -     | -                                  | `false` | Indicates if the value is required. Shows an the "required asterisk" if so.                                                                                                                                                                                           |
| `touched`                    | `bool`             |    -     | -                                  | `false` | Indicates whether the field was touched. Errors will only be shown when the field was touched.                                                                                                                                                                        |
| `name`                       | `string`           |    -     | -                                  | -       | Used as HTML `name` of the input component. property                                                                                                                                                                                                                  |
| `value`                      | `object`           |    ✅    | -                                  | -       | Values to use. Keyed by language, the values are the actual values, e.g. `{ en: 'Horse', de: 'Pferd' }`                                                                                                                                                               |
| `onChange`                   | `function`         |    ✅    | -                                  | -       | Gets called when any input is changed. Is called with the change event of the changed input.                                                                                                                                                                          |
| `selectedLanguage`           | `string`           |    ✅    | -                                  | -       | Specifies which language will be shown in case the `LocalizedMultilineTextInput` is collapsed.                                                                                                                                                                        |
| `onBlur`                     | `func`             |    -     | -                                  | -       | Called when input is blurred                                                                                                                                                                                                                                          |
| `onFocus`                    | `func`             |    -     | -                                  | -       | Called when input is focused                                                                                                                                                                                                                                          |
| `isMultilineDefaultExpanded` | `bool`             |    -     | -                                  | `false` | Expands input components holding multiline values instead of collpasing them by default.                                                                                                                                                                              |
| `hideLanguageControls`       | `bool`             |    -     | -                                  | `false` | Will hide the language toggle controls when set to `true`. It always shows all languages instead.                                                                                                                                                                     |
| `areLanguagesDefaultOpened`  | `bool`             |    -     | -                                  | `false` | Controls whether one or all languages are visible by default. Pass `true` to show all languages by default.                                                                                                                                                           |
| `isAutofocussed`             | `bool`             |    -     | -                                  | -       | Focus the input on initial render                                                                                                                                                                                                                                     |
| `isDisabled`                 | `bool`             |    -     | -                                  | `false` | Indicates that the input cannot be modified (e.g not authorised, or changes currently saving).                                                                                                                                                                        |
| `isReadOnly`                 | `bool`             |    -     | -                                  | `false` | Indicates that the field is displaying read-only content                                                                                                                                                                                                              |
| `placeholder`                | `string`           |    -     | -                                  | -       | Placeholder text for the input                                                                                                                                                                                                                                        |
| `title`                      | `string` or `node` |    ✅    | -                                  | -       | Title of the label                                                                                                                                                                                                                                                    |
| `onInfoButtonClick`          | `function`         |    -     | -                                  | -       | Function called when info button is pressed. Info button will only be visible when this prop is passed.                                                                                                                                                               |
| `hint`                       | `string` or `node` |    -     | -                                  | -       | Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`. |
| `hintIcon`                   | `node`             |    -     | -                                  | -       | Icon to be displayed beside the hint text. Will only get rendered when `hint` is passed as well.                                                                                                                                                                      |
| `description`                | `string` or `node` |    -     | -                                  | -       | Provides a description for the title.                                                                                                                                                                                                                                 |
| `badge`                      | `node`             |    -     | -                                  | -       | Badge to be displayed beside the label. Might be used to display additional information about the content of the field (E.g verified email)                                                                                                                           |

The component further forwards all `data-` attributes to the underlying `input` component.

##### `errors`

This object is a key-value map. The `renderError` prop will be called for each entry with the key and the value. The return value will be rendered inside an `ErrorMessage` component underneath the input.

The `LocalizedMultilineTextField` supports some errors out of the box. Return `undefined` from `renderError` for these and the default errors will be shown instead. This prevents consumers from having to reimplement the same error messages for known errors while still keeping the flexibility of showing custom error messages for them.

When the `key` is known, and when the value is truthy, and when `renderError` returned `undefined` for that error entry, then the `LocalizedMultilineTextField` will render an appropriate error automatically.

Known error keys are:

- `missing`: tells the user that this field is required

### Static methods

This component supports the same static methods as `LocalizedMultilineTextInput`. See `LocalizedMultilineTextInput` for details.
