# UI Kit

This module contains the official UI Kit for developing the MC UI.

https://uikit.commercetools.com/

## Install

```bash
$ npm install --save @commercetools-frontend/ui-kit
```

## Why UIKit

- Declarative components serving as a design guide
- Shared independently from the application's code base
- Used across different apps consumed by different teams
- Shared language between developers and designers

## Ownership

The UIKit is owned **by all developers and designers** working on the MC,
meaning that there it not a single person or a single team responsible for it.

There might be some assigned person(s) driving and coordinating its development
but eventually decisions are made together (see Contributing section below).

This implies that everyone should and is welcomed to contribute to it, just like
an OSS library.

## Structure

- `Buttons`: contains button components (e.g. primary button, flat button)
- `DatePicker`: contains date picker components for different time scales
- `TimeRangePicker`: contains a time range picker (from and to time)
- `Dropdowns`: contains dropdown components (e.g. primary action dropdown)
- `Icons`: contains SVG icons (auto generated from `.svg`-files)
- `Label`: contains label components (e.g. for indicating something critical or
  a warning)
- `Typography`: contains basic components to be used for typography elements
  (e.g. text, titles)
- `Table`: contains the table
- `Tags`: contains tag components of different styles (warning, removable, etc)
- `Materials`: contains the base for composition (colors, spacings, etc)
- `HoCs`: contains Higher Order Components (e.g. for mouse over and -out state
  injection)
