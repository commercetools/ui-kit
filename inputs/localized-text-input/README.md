# LocalizedTextInput

#### Description

A controlled text input component for localized single-line strings with validation
states.

## Usage

```js
import LocalizedTextInput from '@commercetools-local/ui-kit/inputs/localized-text-input';

<LocalizedTextInput
  value={{ en: 'House', de: 'House' }}
  onChange={value => alert(value.en)}
/>;
```

#### Properties

| Props                   | Type       | Required | Values                             | Default | Description                                                                                                               |
| ----------------------- | ---------- | :------: | ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `id`                    | `string`   |          | -                                  | -       | Used as prefix of HTML `id` property. Each input field will get the language as a suffix (`${id}-${lang}`), e.g. `foo-en` |
| `name`                  | `string`   |          | -                                  | -       | Used as HTML `name` property for each input field.                                                                        |
| `value`                 | `object`   |    ✅    | -                                  | -       | Values to use. Keyed by language, the values are the actual values, e.g. `{ en: 'Horse', de: 'Pferd' }`                   |
| `onChange`              | `function` |    ✅    | -                                  | -       | Gets called when any input is changed. Is called with an object of the shape of `value`. The event is not passed along.   |
| `selectedLanguage`      | `string`   |    ✅    | -                                  | -       | Specifies which language will be shown in case the `LocalizedTextInput` is collapsed.                                     |
| `onBlur`                | `function` |          | -                                  | -       | Called when any field is blurred. Is called with the `event` of that field.                                               |
| `onFocus`               | `function` |          | -                                  | -       | Called when any field is focussed. Is called with the `event` of that field.                                              |
| `hideExpansionControls` | `bool`     |          | -                                  | `false` | Will hide the expansion controls when set to `true`. It always shows all languages instead.                               |
| `isDefaultExpanded`     | `bool`     |          | -                                  | `false` | Controls whether one or all languages are visible by default                                                              |
| `isDisabled`            | `bool`     |          | -                                  | `false` | Disables all input fields.                                                                                                |
| `isReadOnly`            | `bool`     |          | -                                  | `false` | Disables all input fields and shows them in read-only mode.                                                               |
| `placeholder`           | `object`   |          | -                                  |         | Placeholders for each language. Object of the same shape as `value`.                                                      |
| `horizontalConstraint`  | `object`   |          | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                |
| `error`                 | `object`   |          |                                    |         | Error message of the input field. Object supporting `{ missing: Boolean }`                                                |

The component forwards all `data` attribute props. It further adds a `-${language}` suffix to the values of the `data-test` and `data-track-component` attributes, e.g `data-test="foo"` will get added to the input for `en` as `data-test="foo-en"`.

Main Functions and use cases are:

- Receiving localized input from user
