# Fields: FieldLabel

#### Description

The `FieldLabel` component represents the label for a field. It is similar to the `LabelField`
component defined in 'core'.

#### Usage

```js
import FieldLabel from '@commercetools-frontend/ui-kit/fields/field-label';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

<FieldLabel
  title={<FormattedMessage {...messages.title} />}
  subtitle={<FormattedMessage {...messages.subtitle} />}
  isRequired={true}
  hasIcon={true}
  onIconClick={() => {}}
  iconLabel={<FormattedMessage {...messages.iconLabel} />}
/>;
```

#### Properties

| Props         | Type     | Required | Values | Default | Description                                        |
| ------------- | -------- | :------: | ------ | ------- | -------------------------------------------------- |
| `title`       | `string` |    ✅    | -      | -       | Title of the label                                 |
| `subtitle`    | `string` |    -     | -      |         | Subtitle for the label                             |
| `isRequired`  | `bool`   |    -     | -      | `false` | Indicates the labeled field is required (if true)  |
| `hasIcon`     | `bool`   |    -     | -      | `false` | Indicates the label should show an InformationIcon |
| `onIconClick` | `func`   |    -     | -      |         | Called when the label's icon is clicked            |
| `iconLabel`   | `string` |    -     | -      |         | Text for the label's icon                          |
