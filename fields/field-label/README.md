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
  hint={<FormattedMessage {...messages.hint} />}
  titleIcon={<IconButton icon={<InformationIcon />} />}
  subtitleIcon={<WarningIcon />}
  badge={<FlatButton tone="primary" label="show" />}
  isRequired={true}
  isBold={false}
  titleTone="inverted"
/>;
```

#### Properties

| Props          | Type     | Required | Values                                                                 | Default | Description                                         |
| -------------- | -------- | :------: | ---------------------------------------------------------------------- | ------- | --------------------------------------------------- |
| `title`        | `string` |    ✅    | -                                                                      | -       | Title of the label                                  |
| `subtitle`     | `string` |    -     | -                                                                      |         | Subtitle for the label                              |
| `hint`         | `string` |    -     | -                                                                      |         | Hint text for the label                             |
| `titleIcon`    | `node`   |    -     | -                                                                      |         | IconButton to be displayed beside the label title   |
| `subtitleIcon` | `node`   |    -     | -                                                                      |         | Icon to be displayed beside the label subtitle      |
| `badge`        | `node`   |    -     | -                                                                      |         | Badge to be displayed beside the label.             |
| `isRequired`   | `bool`   |    -     | -                                                                      | `false` | Indicates if the labeled field is required          |  |
| `isBold`       | `bool`   |    -     | -                                                                      | `false` | Indicates if the label title should be in bold text |
| `titleTone`    | `bool`   |    -     | `['primary', 'secondary', 'positive', 'negative', 'inverted', 'none']` | \_      | Indicates the tone to be applied to the label title |
