# Inputs: File Selection Input

## Usage

```js
import FileSelectionInput from '@commercetools-local/ui-kit/buttons/file-selection-input';
```

#### Description

File selection buttons are similar to primary action buttons, but they are essentially an input used to select files to be uploaded from the user's local machine.

#### Usage

```js
<FileSelectionInput allowMultiple={true} onChange={this.handleChange}>
  <FormattedMessage {...messages.uploadImageText} />
</FileSelectionInput>
```

#### Properties

| Props        | Type      | Required | Values | Default | Description                               |
| ------------ | --------- | :------: | ------ | ------- | ----------------------------------------- |
| `onChange`   | `func`    |    ✅    | -      | -       | What the button will trigger when clicked |
| `children`   | `node`    |    ✅    | -      | -       | Renders as button's text                  |
| `name`       | `string`  |    -     | -      |         | Used as HTML `name` property              |
| `allowMultiple` | `boolean` |    -     | -      | `false` | Allows multiple files upload              |

#### Where to use

Main Functions and use cases are:

* When uploading a file from local machine _example: variant images upload_
