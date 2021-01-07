/* eslint-disable global-require */
module.exports = function getBabelConfig(api, opts = {}) {
  if (api) {
    // Cache the returned value forever and don't call this function again.
    api.cache(true);
  }

  // This is similar to how `env` works in Babel:
  // https://babeljs.io/docs/usage/babelrc/#env-option
  // We are not using `env` because it’s ignored in versions > babel-core@6.10.4:
  // https://github.com/babel/babel/issues/4539
  // https://github.com/facebook/create-react-app/issues/720
  // It’s also nice that we can enforce `NODE_ENV` being specified.
  const env = process.env.BABEL_ENV || process.env.NODE_ENV;
  const isEnvDevelopment = env === 'development';
  const isEnvProduction = env === 'production';
  const isEnvTest = env === 'test';

  if (!isEnvDevelopment && !isEnvProduction && !isEnvTest) {
    throw new Error(
      'The babel preset of requires that you specify `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        `"test", and "production". Instead, received: ${JSON.stringify(env)}.`
    );
  }

  return {
    presets: [
      isEnvTest && [
        // ES features necessary for user's Node version
        require('@babel/preset-env').default,
        {
          targets: {
            browsers: ['last 2 versions'],
            node: '8',
          },
        },
      ],
      (isEnvProduction || isEnvDevelopment) && [
        // Latest stable ECMAScript features
        require('@babel/preset-env').default,
        {
          targets: {
            browsers: ['last 2 versions'],
          },
          corejs: { version: 3, proposals: true },
          // `entry` transforms `@babel/polyfill` into individual requires for
          // the targeted browsers. This is safer than `usage` which performs
          // static code analysis to determine what's required.
          // This is probably a fine default to help trim down bundles when
          // end-users inevitably import '@babel/polyfill'.
          useBuiltIns: 'entry',
          // Do not transform modules to CJS
          modules: false,
          include: ['transform-classes'],
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [
        require('@babel/preset-react').default,
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: isEnvDevelopment || isEnvTest,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          ...(opts.runtime === 'automatic'
            ? // https://emotion.sh/docs/css-prop#babel-preset
              { importSource: '@emotion/react' }
            : { useBuiltIns: true }),
          runtime: opts.runtime || 'classic',
        },
      ],
      // Use this preset only with the JSX runtime `classic`, otherwise
      // use the `@emotion/babel-plugin` plugin.
      // https://emotion.sh/docs/@emotion/babel-preset-css-prop
      opts.runtime !== 'automatic' && [
        '@emotion/babel-preset-css-prop',
        {
          sourceMap: isEnvDevelopment,
          autoLabel: 'dev-only',
        },
      ],
      [require('@babel/preset-typescript').default],
    ].filter(Boolean),
    plugins: [
      // Experimental macros support. Will be documented after it's had some time
      // in the wild.
      require('babel-plugin-macros').default,
      // export { default } from './foo'
      require('@babel/plugin-proposal-export-default-from').default,
      // export * from './foo'
      require('@babel/plugin-proposal-export-namespace-from').default,
      // Necessary to include regardless of the environment because
      // in practice some other transforms (such as object-rest-spread)
      // don't work without it: https://github.com/babel/babel/issues/7215
      require('@babel/plugin-transform-destructuring').default,
      // class { handleClick = () => { } }
      // Enable loose mode to use assignment instead of defineProperty
      // See discussion in https://github.com/facebook/create-react-app/issues/4263
      [
        require('@babel/plugin-proposal-class-properties').default,
        {
          loose: true,
        },
      ],
      // The following two plugins use Object.assign directly, instead of Babel's
      // extends helper. Note that this assumes `Object.assign` is available.
      // { ...todo, completed: true }
      [
        require('@babel/plugin-proposal-object-rest-spread').default,
        {
          useBuiltIns: true,
        },
      ],
      // Polyfills the runtime needed for async/await and generators
      [
        require('@babel/plugin-transform-runtime').default,
        {
          corejs: 3,
          // To be able to use `runtime` in Rollup babel plugin
          helpers: true,
          regenerator: true,
        },
      ],
      isEnvProduction && [
        // Remove PropTypes from production build
        require('babel-plugin-transform-react-remove-prop-types').default,
        {
          mode: 'wrap',
        },
      ],
      // function* () { yield 42; yield 43; }
      !isEnvTest && [
        require('@babel/plugin-transform-regenerator').default,
        {
          // Async functions are converted to generators by @babel/preset-env
          async: false,
        },
      ],
      // Adds syntax support for import()
      require('@babel/plugin-syntax-dynamic-import').default,
      isEnvTest &&
        // Transform dynamic import to require
        require('babel-plugin-transform-dynamic-import').default,
      // Use this plugin only with the JSX runtime `automatic`, otherwise
      // use the `@emotion/babel-preset-css-prop` preset.
      // https://emotion.sh/docs/@emotion/babel-preset-css-prop
      opts.runtime === 'automatic' && require('@emotion/babel-plugin').default,
      // Cherry-pick Lodash modules
      require('babel-plugin-lodash').default,
    ].filter(Boolean),
  };
};
