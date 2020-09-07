### `props.timeZone`

The `timeZone` specifies which time zone the calendar uses, which time zone the selected value is shown in and which time zone entered dates and times are parsed in. For example, given the value is `2018-10-18T00:00:00.000Z` and the`timeZone`is set to`Europe/Berlin`, then entering "13:00" as the time results in the`onChange`being called with`2018-10-15T11:00:00.000Z` (as the time zone offset for that date is two hours).
