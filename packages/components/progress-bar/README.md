<!-- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. -->
<!-- This file is created by the `yarn generate-readme` script. -->

# ProgressBar

## Description

A progress bar component used to visualize the progression of an extended operation

## Installation

```
yarn add @commercetools-uikit/progress-bar
```

```
npm --save install @commercetools-uikit/progress-bar
```

Additionally install the peer dependencies (if not present)

```
yarn add react
```

```
npm --save install react
```

## Usage

```jsx
import ProgressBar from '@commercetools-uikit/progress-bar';

const Example = () => <ProgressBar label={`${50}% completed`} progress={50} />;

export default Example;
```

## Properties

| Props           | Type                                                                                                                          | Required | Default   | Description                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- | :------: | --------- | ---------------------------------------------------------------------------------------------------- |
| `progress`      | `number`                                                                                                                      |          | `0`       | The percentage of the task completion to fill the bar.                                               |
| `label`         | `union`<br/>Possible values:<br/>`, string, ReactElement, (MessageDescriptor & { values?: Record<string, ReactNode> }), null` |          | `null`    | The text to display alongside the bar.                                                               |
| `labelPosition` | `union`<br/>Possible values:<br/>`'top' , 'bottom' , 'left' , 'right'`                                                        |          | `'top'`   | Location of the text in relation to the bar.                                                         |
| `labelWidth`    | `union`<br/>Possible values:<br/>`, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 'scale', 'auto'`                                  |          | `'scale'` | The scale of the width for the label, uses values available in the Constraints.Horizontal component. |
| `isInverted`    | `boolean`                                                                                                                     |          | `false`   | Specifies the use of light colors(default) or dark colors.                                           |
| `isAnimated`    | `boolean`                                                                                                                     |          | `true`    | Specifies whether the inner bar should have the styles animated.                                     |
| `height`        | `union`<br/>Possible values:<br/>`'10' , '20'`                                                                                |          | `'20'`    | The scale of the height for the bar, also affects the styles of the label.                           |
| `barWidth`      | `union`<br/>Possible values:<br/>`4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13 , 14 , 15 , 16 , 'scale'`                         |          | `6`       | The scale of the width for the label, uses values available in the Constraints.Horizontal component. |