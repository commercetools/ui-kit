### Design token

> There are only two hard problems in Computer Science: cache invalidation and naming things — Phil Karlton

Design Tokens are an abstraction for everything impacting the visual design of an app/platform. They are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes.

> A system’s strength comes from knowing how to apply options (like $color-neutral-20) to contexts (like a conventional dark background color). This grounds the option as a decision.

```
$background-color-dark = $color-neutral-20;
$background-color-light = $color-neutral-90;
$font-size-paragraph = $font-size-m;
$font-size-microcopy = $font-size-s;
$space-inset-default = 16px 16px 16px 16px;
$space-stack-l = 0 0 32px 0;
```

for more info: https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421

#### Creating a variable

Having no structure or naming conventions, can easily lead to an unmaintainable codebase in the long term.
This naming approach ensures that everyone who participates in the development of the application "speaks the same language". Using proper naming will prepare us for the changes in design of the application.

A design token variable is composed by two dashes plus the word `token` plus dash plus type plus dash plus element name plus element state: `--token-type-element-state`

###### Good

```
--token-background-input-default: var(--color-white);
```

###### Bad

```
--token-input-background-default: var(--color-white);
```

### Folder location

```
Project Root
└── packages-shared
    ├── ui-kit
        ├── materials
          ├── tokens // contains all tokens
            ├── backgrounds.mod.css
            ├── borders.mod.css
            └── ...etc
          ├── spacings
          ├── images
          ├── constraints
          ├── borders.mod.css
          ├── colors.mod.css
          └── ...etc
```

#### Usage

```
@import '../../materials/tokens';
```

and then:

```
.textarea {
  color: var(--token-font-color-default);
  font-family: var(--token-font-family-default);
  font-size: var(--token-font-size-body);
}

.textarea:disabled {
  composes: textarea;
  color: var(--token-font-color-disabled);
  border: 1px solid var(--token-border-color-input-disabled);
  background: var(--token-background-color-input-disabled);
}
```

### The file

Understanding how your code is organized allows anybody to jump straight into the action. Therefore it's important to organize our files into sections

Here's an example of what a design token file should look like

```
/**
 *
 * Title
 *
 * Short description
 *
 *  Index
 *  • Section
 *   ◦ Sub section
 *    ▪ Token Property
 *    ▪ Token Property
 *
 */

/*
 ==========================================================================
   Section name
   ========================================================================== */

/* Type (sub-section)
   ========================================================================== */

/* Property */

  --token ....

/* Property */
  --token ....
```
