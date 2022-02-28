### Static Properties

### `createLocalizedString(languages, existingTranslations)`

This function creates a [localized string](https://docs.commercetools.com/http-api-types.html#localizedstring). It merges the `languages` and the language keys of existing translations to form a localized string holding all languages.
The `existingTranslations` argument is optional. If it is not passed, an empty localized field will be created.

```js
const languages = ['en', 'de'];
LocalizedRichTextInput.createLocalizedString(languages);
// -> { en: '<p></p>', de: '<p></p>' }
```

In case existingTranslations is passed, it will merge an empty localized field with the existing translations. Usually this is used to ensure that a localized string contains at least the project's languages.

```js
const languages = ['en', 'de'];
const existingTranslations = { en: '<p>Tree</p>', ar: '<p>شجرة</p>' };
LocalizedRichTextInput.createLocalizedString(languages, existingTranslations);
// -> { en: 'Tree', de: '', ar: '<p>شجرة</p>' }
```

### `isEmpty(localizedField)`

Returns `true` when all values in a localized field are empty.

```js
LocalizedRichTextInput.isEmpty({});
// -> true
```

```js
LocalizedRichTextInput.isEmpty({ en: '', de: '<p></p>' });
// -> true
```

```js
LocalizedRichTextInput.isEmpty({ en: '<p>Tree</p>', de: '<p></p>' });
// -> false
```

### `omitEmptyTranslations(localizedField)`

Omits translations with empty values.

```js
LocalizedRichTextInput.omitEmptyTranslations({ en: '', de: '  ' });
// -> {}
```

```js
LocalizedRichTextInput.omitEmptyTranslations({ en: '<p>Tree</p>', de: '' });
// -> { en: '<p>Tree</p>' }
```

### `isTouched(touched)`

Expects to be called with an object or `undefined`.
Returns `true` when at least one value is truthy.

### `RequiredValueErrorMessage`

This field exports a default error message which can be used when the field is
required, but the user provided no value. You can use it as
