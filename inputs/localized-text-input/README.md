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

| Props               | Type       | Required | Values                    | Default | Description                                                                                                               |
| ------------------- | ---------- | :------: | ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `id`                | `string`   |          | -                         | -       | Used as prefix of HTML `id` property. Each input field will get the language as a suffix (`${id}-${lang}`), e.g. `foo-en` |
| `name`              | `string`   |          | -                         | -       | Used as HTML `name` property for each input field.                                                                        |
| `value`             | `object`   |    ✅    | -                         | -       | Values to use. Keyed by language, the values are the actual values, e.g. `{ en: 'Horse', de: 'Pferd' }`                   |
| `onChange`          | `function` |    ✅    | -                         | -       | Gets called when any input is changed. Is called with an object of the shape of `value`. The event is not passed along.   |
| `selectedLanguage`  | `string`   |    ✅    | -                         | -       | Specifies which language will be shown in case the `LocalizedTextInput` is collapsed.                                     |
| `onBlur`            | `function` |          | -                         | -       | Called when any field is blurred. Is called with the `event` of that field.                                               |
| `onFocus`           | `function` |          | -                         | -       | Called when any field is focussed. Is called with the `event` of that field.                                              |
| `isAlwaysExpanded`  | `bool`     |          | -                         | `false` | Will hide the expansion controls when set to `true`. It always shows all languages instead.                               |
| `isDefaultExpanded` | `bool`     |          | -                         | `false` | Controls whether one or all languages are visible by default                                                              |
| `isDisabled`        | `bool`     |          | -                         | `false` | Disables all input fields.                                                                                                |
| `isReadOnly`        | `bool`     |          | -                         | `false` | Disables all input fields and shows them in read-only mode.                                                               |
| `placeholder`       | `object`   |          | -                         |         | Placeholders for each language. Object of the same shape as `value`.                                                      |
| `horizontalSize`    | `object`   |          | `small`, `medium`, `full` | `full`  | Horizontal size limit of the input fields.                                                                                |
| `error`             | `object`   |          |                           |         | Error message of the input field. Object supporting `{ missing: Boolean }`                                                |

Main Functions and use cases are:

* Receiving localized input from user
