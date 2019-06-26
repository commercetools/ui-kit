#### Custom Property Replacer

The purpose of this PostCSS plugin is to replace deprecated custom properties with the new custom properties. To use this plugin, follow the following instructions.

First create a file called `postcss.config.js` in the root of your project.

```js
module.exports = {
  plugins: [
    require('@commercetools-frontend/ui-kit/codemods/custom-property-replacer')(
      {
        file: require.resolve(
          '@commercetools-frontend/ui-kit/codemods/custom-property-replacer/v10/variable-mapping.json'
        ),
      }
    ),
  ],
};
```

Note: if you are using SCSS instead of CSS, you may need to change the parser. Please check the `postcss-cli` [documentation](https://github.com/postcss/postcss-cli) for more information.

Next, use the command line to run the code transformation.

`npx postcss-cli **/*.css -r`

This will replace your usage of deprecated custom properties with the new custom properties.
