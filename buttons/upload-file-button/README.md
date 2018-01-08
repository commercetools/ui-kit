# Buttons: Upload File Button

## Usage

```js
import UploadFileButton from '@commercetools-local/ui-kit/buttons/upload-file-button';
```

#### Description

Upload File buttons are similar to primary action buttons, but they are used to upload files from the user's local machine

#### Usage

```js
<UploadFileButton isMultiple={true} onChange={this.handleChange}>
  <FormattedMessage {...messages.uploadImageText} />
</UploadFileButton>
```

#### Properties

| Props        | Type      | Required | Values | Default | Description                               |
| ------------ | --------- | :------: | ------ | ------- | ----------------------------------------- |
| `onChange`   | `func`    |    ✅    | -      | -       | What the button will trigger when clicked |
| `children`   | `node`    |    ✅    | -      | -       | Renders as button's text                  |
| `isMultiple` | `boolean` |    -     | -      | `false` | Allows multiple files upload              |

#### Where to use

Main Functions and use cases are:

* When uploading a file from local machine _example: variant images upload_
