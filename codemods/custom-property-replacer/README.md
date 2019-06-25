#### Custom Property Replacer

The purpose of this PostCSS plugin is to replace deprecated custom properties with the new custom properties. To use this plugin, follow the following instructions.

First, start by installing `postcss-cli`. You will use this to run the css transformation.

`yarn add -D postcss-cli`

Next, create a file called `postcss.config.js` in the root of your project.

```js
module.exports = {
  plugins: [
    require('@commercetools-frontend/ui-kit/codemods/custom-property-replacer')(
      {
        file: require.resolve(
          '@commercetools-frontend/ui-kit/codemods/custom-property-replacer/variable-mapping.json'
        ),
      }
    ),
  ],
};
```

Note: if you are using SCSS instead of CSS, you may need to change the parser. Please check the `postcss-cli` [documentation](https://github.com/postcss/postcss-cli) for more information.

Next, use the command line to run the code transformation.

`yarn postcss postcss-codemods/**/*.css -r`

This should replace your usage of deprecated custom properties with the new custom properties.
