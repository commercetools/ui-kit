/**
 * https://emotion.sh/docs/emotion-11#css-prop-types
 *
 * However, if you are stuck with older version of TypeScript or using the
 * classic runtime implicitly by using our `@emotion/babel-preset-css-prop`
 * then it’s not possible to leverage `css` prop support being added conditionally
 * based on a type of rendered component.
 * For those cases we have added a special file that can be imported once
 * to add support for the `css` prop globally, for all components.
 *
 * TODO: remove this once we switch to automatic jsx runtime
 */
/// <reference types="@emotion/react/types/css-prop" />
