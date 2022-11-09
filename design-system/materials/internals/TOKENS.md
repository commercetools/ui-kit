# Design Tokens

> This document is a WIP and subject to change as we learn more about design tokens.

We use design tokens as the smallest form of information in our visual language.
The tokens give semantic meaning to our plain palette of choices..

- [What are Choices, Decisions and Design Tokens?](#what-are-choices-decisions-and-design-tokens)
- [Choices](#choices)
- [Design Tokens](#design-tokens)
- [Design Tokens limit choices by making decisions](#design-tokens-limit-choices-by-making-decisions)
  - [Example for colors](#example-for-colors)
  - [Example for font-sizes](#example-for-font-sizes)
- [Token Structure](#token-structure)
- [Aspects](#aspects)
  - [Aspect: Property](#aspect-property)
  - [Aspect: Component Group](#aspect-component-group)
  - [Aspect: State](#aspect-state)
    - [`active` vs `focused`](#active-vs-focused)
  - [Aspect: Variant](#aspect-variant)

## What are Choices, Decisions and Design Tokens?

A design system offers a range of **choices**. The choices are all possible values which can be used. For example, having a predefined set of choices limits the amount of possible colors used in our designs.

**Decisions** apply choices to specific situations, giving them semantic meaning. For example, only a subset of all available colors can be used for background colors. Another subset of colors can be used for font colors. More specific decisions could be to use a certain color like `color-orange` (from the choices) for the border color of an input component in a disabled state.

Every **decision** made results in a **Design Token** which represent that decision by giving it semantic meaning. For example the token `--border-color-for-input-when-disabled` could hold `color-orange` which would constitute a decision. The decision would be to use the choice `color-orange` for the property `border-color` when a component of the component group `input` is in the `disabled` state.

## Choices

The following are examples of choices available in our design system:

- Colors
- Spacings
- Font Sizes
- _see the Tokens Story for a full overview_

## Design Tokens

Check out the story in [Storybook](https://uikit.commercetools.com/?selectedKind=Basics%7CTokens&selectedStory=All%20Tokens) to see our design tokens.

## Design Tokens limit choices by making decisions

These general choices are narrowed down by design tokens. Design Tokens
limit the choices we offer for certain properties by deciding which to use for specific groups.

### Example for colors

An example for this is our color palette: The system offers a range of colors:

```
# Choices (not design tokens)
color-black
color-white
color-grey
color-orange
color-red
color-green
color-purple
```

These colors are then narrowed down by design tokens into
specific groups like `font-color`s, `background-color`s and `border-color`s. This
helps to limit the choices when it comes to certain properties:

```
--background-color-for-input: color-white
--border-color-for-input: color-grey
--font-color-for-input: color-black
--font-color-for-input-when-disabled: color-grey
```

For example, we made the **decision** to use the **choice** `color-white` for our **token** `--background-color-for-input`.

| Token                          | Choice        | Decision                                    |
| ------------------------------ | ------------- | ------------------------------------------- |
| `--background-color-for-input` | `color-white` | `--background-color-for-input: color-white` |

### Example for font-sizes

Another example are the font-sizes: The system offers a range of font-sizes like

```
# Choices (not design tokens)
font-size-xs
font-size-s
font-size-m
font-size-l
font-size-xl
```

These get narrowed down by semantic design tokens:

```
# Semantic tokens
# Notice that the selection is gone (no "xs", "m" etc) because we made a decision
--font-size-for-input
--font-size-for-headline
```

`--font-size-for-input` could then hold `font-size-m` for example. This is
a decision. Making decisions at the design stage reduces the amount of choices
designers have when using the design system. We already made the decision
of which font-size to use for inputs, so nobody else will need to worry about it.

_This short [article](https://techpinions.com/snippet-design-is-the-difference-between-choice-and-decision/32765) explains Choices and Decisions extremely nicely without talking about design systems at all._

## Token Structure

Our design tokens aim to be human-readable and easy to comprehend. We settled on
a format which contains separator words (**`for`, `when` and `as`**) to help distinguish
between the different aspects of a design token.

Each token should follow this schema:

1. component group
2. variant (optional and multiple of them can be applied)
3. state (optional)

```
<attribute>-for-<component-group>-as-<variant>-when-<state>
```

**Examples:**

```
-- background-color-for-tag
-- font-color-for-button-when-disabled
-- font-size-for-text-as-body-as-small
-- border-for-button-as-secondary-when-hovered
-- border-radius-for-button-as-icon-as-small-when-disabled
```

## Aspects

We start with specifying generic design tokens for a **property** like

```
--font-color
```

More specific tokens can be introduced

...for specific **component group**s:

```
--font-color-for-input
```

...or for a specific **state**

```
--font-color-when-disabled
```

...or for a specific **variant**

```
--font-size-for-text-as-h1
```

This leads us to four different aspects of a design token:

- Property
- Component Group
- State
- Variant

Example:

<img src="https://i.imgur.com/y8Dhedi.jpg" width="552" />

> Note: We already dropped the `--token` prefix but have not upgraded this graphic yet.

### Aspect: Property

The property defines which visual attribute the design token influences.

Examples are: `font-color`, `background-color`, `border-color`, `border-radius`, `font-size`.

### Aspect: Component Group

The Component Group limits the choices to a certain type of component. We identified the following component groups:

- `button`: Clickable elements which trigger an action
- `input`: Elements which get information from the user
- _many more, see the Tokens Story for a full overview_

### Aspect: State

States are not exclusive. An element can be in multiple states at the same time.

We identified the following states:

| State      | Maps to CSS pseudo class | Description                                                                                      |
| ---------- | ------------------------ | ------------------------------------------------------------------------------------------------ |
| `visited`  | `:visited`               | The user has visited this link before                                                            |
| `hovered`  | `:hover`                 | The pointer is over this element                                                                 |
| `active`   | `:active`                | The element is currently being activated by the user                                             |
| `focused`  | `:focus`                 | The element is currently selected to receive input                                               |
| `disabled` | `:disabled`              | The element can not be interacted with                                                           |
| `readonly` | `:read-only`             | The element can not be modified                                                                  |
| `checked`  | `:checked`               | The element is checked by the user (e.g. for checkboxes).                                        |
| `warning`  | -                        | The element contains a warning. Warnings do not block the further flow but should be resolved.   |
| `error`    | -                        | The element contains an error. Errors block the further flow and must be resolved.               |
| `info`     | -                        | The element contains a hint. Hints do not block the further flow and do not need to be resolved. |

For an up-to-date list, check out the Tokens Story.

#### `active` vs `focused`

`focused` and `active` are two different states.

`focused` represents the state when the element is currently selected to receive input and `active` represents the state when the element is being activated by the user.

##### Example

Let's say we have a `<button>`. The `<button>` will not have any state to begin with. It just exists. If we use <kbd>Tab</kbd> to give "focus" to the `<button>`, it now enters its `focused` state. If you then click (or press <kbd>Space</kbd>), you then make the button enter its `active` state.

On that note, when you click on an element, you give it focus, which also cultivates the illusion that `focused` and `active` are the same. They are not the same. When clicked, the button is in `focused` and `active` state.

In other words: An element in `active` state must also be in the `focused` state, but not all `focused` elements are in an `active` state.

_This explanation was taken from https://stackoverflow.com/a/1678020 and modified slightly._

### Aspect: Variant

Some elements have different variants such as `text` has a variant of `h1` or `body`. Variants allow us to
represent that information in the design token.
