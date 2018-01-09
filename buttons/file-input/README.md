# Inputs: File Input

## Usage

```js
import FileInput from '@commercetools-local/ui-kit/buttons/file-input';
```

#### Description

File selection inputs are similar to primary action buttons, but they are essentially an input used to select files to be uploaded from the user's local machine.

#### Usage

```js
<FileInput allowMultiple={true} onChange={this.handleChange}>
  <FormattedMessage {...messages.uploadImageText} />
</FileInput>
```

#### Properties

| Props           | Type      | Required | Values | Default                          | Description                                             |
| --------------- | --------- | :------: | ------ | -------------------------------- | ------------------------------------------------------- |
| `onChange`      | `func`    |    ✅    | -      | -                                | What the button will trigger after user selects file(s) |
| `children`      | `node`    |    ✅    | -      | -                                | Renders as button's text                                |
| `acceptTypes`   | `string`  |    ✅    | -      | `image/png,image/jpeg,image/gif` | Renders as HTML `accept` property                       |
| `name`          | `string`  |    -     | -      |                                  | Used as HTML `name` property                            |
| `allowMultiple` | `boolean` |    -     | -      | `false`                          | Allows multiple files upload                            |

#### Where to use

Main Functions and use cases are:

* When uploading a file from local machine _example: variant images upload_
