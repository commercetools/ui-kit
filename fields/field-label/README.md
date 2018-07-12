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
  isRequired={true}
  titleIcon={<IconButton icon={<InformationIcon />} />}
  subtitleIcon={<WarningIcon />}
/>;
```

#### Properties

| Props          | Type     | Required | Values | Default | Description                                       |
| -------------- | -------- | :------: | ------ | ------- | ------------------------------------------------- |
| `title`        | `string` |    ✅    | -      | -       | Title of the label                                |
| `subtitle`     | `string` |    -     | -      |         | Subtitle for the label                            |
| `hint`         | `string` |    -     | -      |         | Hint text for the label                           |
| `isRequired`   | `bool`   |    -     | -      | `false` | Indicates the labeled field is required (if true) |  |
| `titleIcon`    | `node`   |    -     | -      |         | IconButton to be displayed beside the label title |
| `subtitleIcon` | `node`   |    -     | -      |         | Icon to be displayed beside the label subtitle    |
