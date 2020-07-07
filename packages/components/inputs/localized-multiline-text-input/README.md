# LocalizedMultilineTextInput

#### Description

A controlled text input component for localized multi-line strings with validation
states.

## Usage

```js
import { LocalizedMultilineTextInput } from '@commercetools-frontend/ui-kit';

<LocalizedMultilineTextInput
  value={{ en: 'House\nFoo', de: 'House' }}
  onChange={(event) => alert(event.target.name, event.target.value)}
/>;
```

#### Properties

| Props                           | Type             | Required | Values                  | Default | Description                                                                                                                                                     |
| ------------------------------- | ---------------- | :------: | ----------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                            | `string`         |    -     | -                       | -       | Used as prefix of HTML `id` property. Each input field id will have the language as a suffix (`${idPrefix}.${lang}`), e.g. `foo.en`                             |
| `name`                          | `string`         |    -     | -                       | -       | Used as HTML `name` property for each input field. Each input field name will have the language as a suffix (`${namePrefix}.${lang}`), e.g. `foo.en`            |
| `value`                         | `object`         |    ✅    | -                       | -       | Values to use. Keyed by language, the values are the actual values, e.g. `{ en: 'Horse', de: 'Pferd' }`                                                         |
| `autoComplete`                  | `string`         |    -     | -                       | -       | Used as HTML `autocomplete` property                                                                                                                            |
| `onChange`                      | `function`       |    ✅    | -                       | -       | Gets called when any input is changed. Is called with the change event of the changed input.                                                                    |
| `selectedLanguage`              | `string`         |    ✅    | -                       | -       | Specifies which language will be shown in case the `LocalizedMultilineTextInput` is collapsed.                                                                  |
| `onBlur`                        | `function`       |    -     | -                       | -       | Called when any field is blurred. Is called with the `event` of that field.                                                                                     |
| `onFocus`                       | `function`       |    -     | -                       | -       | Called when any field is focussed. Is called with the `event` of that field.                                                                                    |
| `defaultExpandMultilineText`    | `bool`           |    -     | -                       | `false` | Expands input components holding multiline values instead of collpasing them by default.                                                                        |
| `hideLanguageExpansionControls` | `bool`           |    -     | -                       | `false` | Will hide the language expansion controls when set to `true`. All languages will be shown when set to `true`.                                                   |
| `defaultExpandLanguages`        | `bool`           |    -     | -                       | `false` | Controls whether one or all languages are visible by default. Pass `true` to show all languages by default.                                                     |
| `isAutofocussed`                | `bool`           |    -     | -                       | `false` | Sets the focus on the first input when `true` is passed.                                                                                                        |
| `isDisabled`                    | `bool`           |    -     | -                       | `false` | Disables all input fields.                                                                                                                                      |
| `isReadOnly`                    | `bool`           |    -     | -                       | `false` | Disables all input fields and shows them in read-only mode.                                                                                                     |
| `placeholder`                   | `object`         |    -     | -                       | -       | Placeholders for each language. Object of the same shape as `value`.                                                                                            |
| `horizontalConstraint`          | `object`         |    -     | `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                                      |
| `hasError`                      | `bool`           |    -     | -                       | -       | Will apply the error state to each input without showing any error message.                                                                                     |
| `hasWarning`                    | `bool`           |    -     | -                       | -       | Will apply the warning state to each input without showing any warning message.                                                                                 |
| `errors`                        | `objectOf(node)` |    -     | -                       | -       | Used to show errors underneath the inputs of specific currencies. Pass an object whose key is a currency and whose value is the error to show for that key.     |
| `warnings`                      | `objectOf(node)` |    -     | -                       | -       | Used to show warnings underneath the inputs of specific currencies. Pass an object whose key is a currency and whose value is the warning to show for that key. |

The component forwards all `data` attribute props. It further adds a `-${language}` suffix to the values of the `data-test` and `data-track-component` attributes, e.g `data-test="foo"` will get added to the input for `en` as `data-test="foo-en"`.

Main Functions and use cases are:

- Receiving localized input from user

#### Static Properties

##### `createLocalizedString(languages, existingTranslations)`

This function creates a [localized string](https://docs.commercetools.com/http-api-types.html#localizedstring). It merges the `languages` and the language keys of existing translations to form a localized string holding all languages.
The `existingTranslations` argument is optional. If it is not passed, an empty localized field will be created.

```js
const languages = ['en', 'de'];
LocalizedMultilineTextInput.createLocalizedString(languages);
// -> { en: '', de: '' }
```

In case existingTranslations is passed, it will merge an empty localized field with the existing translations. Usually this is used to ensure that a localized string contains at least the project's languages.

```js
const languages = ['en', 'de'];
const existingTranslations = { en: 'Tree', ar: 'شجرة' };
LocalizedMultilineTextInput.createLocalizedString(
  languages,
  existingTranslations
);
// -> { en: 'Tree', de: '', ar: 'شجرة' }
```

##### `isEmpty(localizedField)`

Returns `true` when all values in a localized field are empty.

```js
LocalizedMultilineTextInput.isEmpty({});
// -> true
```

```js
LocalizedMultilineTextInput.isEmpty({ en: '', de: '  ' });
// -> true
```

```js
LocalizedMultilineTextInput.isEmpty({ en: 'Tree', de: '' });
// -> false
```

##### `omitEmptyTranslations(localizedField)`

Omits translations with empty values.

```js
LocalizedMultilineTextInput.omitEmptyTranslations({ en: '', de: '  ' });
// -> {}
```

```js
LocalizedMultilineTextInput.omitEmptyTranslations({ en: 'Tree', de: '' });
// -> { en: 'Tree' }
```

##### `isTouched(touched)`

Expects to be called with an object or `undefined`.
Returns `true` when at least one value is truthy.

##### `RequiredValueErrorMessage`

This field exports a default error message which can be used when the field is
required, but the user provided no value. You can use it as

```js
render (
  return (
    <div>
      <LocalizedMultilineTextInput hasError={isMissing} />
      {
        isMissing && <LocalizedMultilineTextInput.RequiredValueErrorMessage />
      }
    </div>
  )
)
```
