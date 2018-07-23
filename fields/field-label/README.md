# Fields: FieldLabel

#### Description

The FieldLabel component represents the label for a field. This component can also be used to better explain an input field and to guide the user to fill the form.

#### Usage

```js
import FieldLabel from '@commercetools-frontend/ui-kit/fields/field-label';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

<FieldLabel
  title={<FormattedMessage {...messages.title} />}
  subtitle={<FormattedMessage {...messages.subtitle} />}
  hint={<FormattedMessage {...messages.hint} />}
  titleIcon={<IconButton icon={<InformationIcon />} />}
  subtitleIcon={<WarningIcon />}
  badge={<FlatButton tone="primary" label="show" />}
  isRequired={true}
  isBold={false}
  tone="inverted"
  htmlFor="sampleInput"
/>;
```

#### Properties

| Props          | Type               | Required | Values                                                         | Default | Description                                          |
| -------------- | ------------------ | :------: | -------------------------------------------------------------- | ------- | ---------------------------------------------------- |
| `title`        | `string` or `node` |    ✅    | -                                                              | -       | Title of the label                                   |
| `subtitle`     | `string` or `node` |    -     | -                                                              |         | Subtitle for the label                               |
| `hint`         | `string` or `node` |    -     | -                                                              |         | Hint text for the label                              |
| `titleIcon`    | `node`             |    -     | -                                                              |         | IconButton to be displayed beside the label title    |
| `subtitleIcon` | `node`             |    -     | -                                                              |         | Icon to be displayed beside the label subtitle       |
| `badge`        | `node`             |    -     | -                                                              |         | Badge to be displayed beside the label.              |
| `isRequired`   | `bool`             |    -     | -                                                              | `false` | Indicates if the labeled field is required in a form |  |
| `isBold`       | `bool`             |    -     | -                                                              | `false` | Indicates if the label title should be in bold text  |
| `tone`         | `string`           |    -     | `['primary', 'secondary', 'positive', 'negative', 'inverted']` | \_      | Indicates the tone to be applied to the label title  |
| `htmlFor`      | `string`           |    -     | -                                                              | -       | ID of the labeled input                              |
