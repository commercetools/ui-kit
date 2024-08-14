## `data-*` props

The component forwards all `data` attribute props. It further adds a `-${language}` suffix to the values of the `data-test` and `data-track-component` attributes, e.g `data-test="foo"` will get added to the input for `en` as `data-test="foo-en"`.

Main Functions and use cases are:

- Receiving localized input from user

## Static Properties

### `createLocalizedString(languages, existingTranslations)`

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

### `isEmpty(localizedField)`

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

### `omitEmptyTranslations(localizedField)`

Omits translations with empty values.

```js
LocalizedMultilineTextInput.omitEmptyTranslations({ en: '', de: '  ' });
// -> {}
```

```js
LocalizedMultilineTextInput.omitEmptyTranslations({ en: 'Tree', de: '' });
// -> { en: 'Tree' }
```

### `isTouched(touched)`

Expects to be called with an object or `undefined`.
Returns `true` when at least one value is truthy.

### `RequiredValueErrorMessage`

This field exports a default error message which can be used when the field is
required, but the user provided no value. You can use it as

```jsx
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
