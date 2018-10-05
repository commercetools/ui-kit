# LocalizedTextInput

#### Description

A controlled text input component for localized single-line strings with validation
states.

## Usage

```js
import { LocalizedTextInput } from '@commercetools-frontend/ui-kit';

<LocalizedTextInput
  value={{ en: 'House', de: 'House' }}
  onChange={event => alert(event.target.name, event.target.value)}
/>;
```

#### Properties

| Props                   | Type             | Required | Values                             | Default | Description                                                                                                                                                                                                                                           |
| ----------------------- | ---------------- | :------: | ---------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                    | `string`         |          | -                                  | -       | Used as prefix of HTML `id` property. Each input field id will have the language as a suffix (`${idPrefix}.${lang}`), e.g. `foo.en`. You can use the static `LocalizedTextInput.getId(idPrefix, language)` to create this id string, e.g. for labels. |
| `name`                  | `string`         |          | -                                  | -       | Used as HTML `name` property for each input field. Each input field name will have the language as a suffix (`${namePrefix}.${lang}`), e.g. `foo.en`                                                                                                  |
| `value`                 | `object`         |    ✅    | -                                  | -       | Values to use. Keyed by language, the values are the actual values, e.g. `{ en: 'Horse', de: 'Pferd' }`                                                                                                                                               |
| `onChange`              | `function`       |    ✅    | -                                  | -       | Gets called when any input is changed. Is called with the change event of the changed input.                                                                                                                                                          |
| `selectedLanguage`      | `string`         |    ✅    | -                                  | -       | Specifies which language will be shown in case the `LocalizedTextInput` is collapsed.                                                                                                                                                                 |
| `onBlur`                | `function`       |          | -                                  | -       | Called when any field is blurred. Is called with the `event` of that field.                                                                                                                                                                           |
| `onFocus`               | `function`       |          | -                                  | -       | Called when any field is focussed. Is called with the `event` of that field.                                                                                                                                                                          |
| `hideExpansionControls` | `bool`           |          | -                                  | `false` | Will hide the expansion controls when set to `true`. It always shows all languages instead.                                                                                                                                                           |
| `isDefaultExpanded`     | `bool`           |          | -                                  | `false` | Controls whether one or all languages are visible by default                                                                                                                                                                                          |
| `isDisabled`            | `bool`           |          | -                                  | `false` | Disables all input fields.                                                                                                                                                                                                                            |
| `isReadOnly`            | `bool`           |          | -                                  | `false` | Disables all input fields and shows them in read-only mode.                                                                                                                                                                                           |
| `placeholder`           | `object`         |          | -                                  |         | Placeholders for each language. Object of the same shape as `value`.                                                                                                                                                                                  |
| `horizontalConstraint`  | `object`         |          | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                                                                                                                            |
| `hasError`              | `bool`           |          |                                    |         | Will apply the error state to each input without showing any error message.                                                                                                                                                                           |
| `errors`                | `objectOf(node)` |          |                                    |         | Used to show errors underneath the inputs of specific languages. Pass an object holding the language to show the error for as the key, and a value holding a React node which will be shown underneath the input.                                     |

The component forwards all `data` attribute props. It further adds a `-${language}` suffix to the values of the `data-test` and `data-track-component` attributes, e.g `data-test="foo"` will get added to the input for `en` as `data-test="foo-en"`.

Main Functions and use cases are:

- Receiving localized input from user

#### Static Properties

##### `createLocalizedString(languages, existingTranslations)`

This function creates a [localized string](https://docs.commercetools.com/http-api-types.html#localizedstring). It merges the `languages` and the language keys of existing translations to form a localized string holding all languages.
The `existingTranslations` argument is optional. If it is not passed, an empty localized field will be created.

```js
const languages = ['en', 'de'];
LocalizedTextInput.createLocalizedString(languages);
// -> { en: '', de: '' }
```

In case existingTranslations is passed, it will merge an empty localized field with the exisiting translations. Usually this is used to ensure that a localized string contains at least the project's languages.

```js
const languages = ['en', 'de'];
const existingTranslations = { en: 'Tree', ar: 'شجرة' };
LocalizedTextInput.createLocalizedString(languages, existingTranslations);
// -> { en: 'Tree', de: '', ar: 'شجرة' }
```

##### `isEmpty(localizedField)`

Returns `true` when all values in a localized field are empty.

```js
LocalizedTextInput.isEmpty({});
// -> true
```

```js
LocalizedTextInput.isEmpty({ en: '', de: '  ' });
// -> true
```

```js
LocalizedTextInput.isEmpty({ en: 'Tree', de: '' });
// -> false
```

##### `omitEmptyTranslations(localizedField)`

Omits translations with empty values.

```js
LocalizedTextInput.omitEmptyTranslations({ en: '', de: '  ' });
// -> {}
```

```js
LocalizedTextInput.omitEmptyTranslations({ en: 'Tree', de: '' });
// -> { en: 'Tree' }
```

##### `isTouched(touched)`

Expects to be called with an object or `undefined`.
Returns `true` when at least one value is truthy.

##### `RequiredValueErrorMessage`

This field exports a default error message which can be used when the field is
required, but the user provided no value. You can use it as

```js
<LocalizedTextInput hasError={isMissing} />;
{
  isMissing && <LocalizedTextInput.RequiredValueErrorMessage />;
}
```

##### `getId(idPrefix, language)`

Returns the `id` of the input field of a specific language. This is useful in case you want to create a label for the input field. You can use it as

```js
LocalizedTextInput.getId('name', 'en');
// -> "name.en"
```

Or as a more complete example:

```js
<label htmlFor={LocalizedTextInput.getId('name', 'en')}>Name</label>
<LocalizedTextInput
  id="name"
  selectedLanguage="en"
  // ...
/>
```

##### `getName(idPrefix, language)`

Returns the `name` of the input field of a specific language. . You can use it as

```js
LocalizedTextInput.getName('slug', 'en');
// -> "slug.en"
```
