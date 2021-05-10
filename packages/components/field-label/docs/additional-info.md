## `hintIcon`

The `hintIcon` also accepts a custom `color` while defaulting to `warning` in the case above. The `hintIcon` does **not** support the `size` prop, and will always be rendered in the size `medium`.

```diff
<FieldLabel
  title={<FormattedMessage {...messages.title} />}
  hasRequiredIndicator={true}
  onInfoButtonClick={() => {}} />}
  hint={<FormattedMessage {...messages.hint} />}
- hintIcon={<WarningIcon />}
+ hintIcon={<WarningIcon color="primary" />}
  description={<FormattedMessage {...messages.description} />}
  badge={<FlatButton tone="primary" label="show" />}
  htmlFor="sampleInput"
  horizontalConstraint={7}
/>
```

## `hint` vs `description`

Most fields will only use the `description` which provides more information about what the entered value will be used for.

The `hint` however is used to show additional information about the value the user enters. It can show the allowed characters. It can also show whether the entered value has errors (like a reference no longer existing in an attribute) when the form is loaded for the first time.

Neither of them should be used for form validation.

## Dos and don'ts

Recommended to be used in vertical forms. (E.g input field below the label, and not besides).
