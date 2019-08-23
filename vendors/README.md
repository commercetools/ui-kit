#### Why is this here?

Node is shipped by default with only the `en-US` locale. However, since UI-Kit supports multiple languages, we want to be able to use these languages in our tests.

There is currently an issue with installing `full-icu` with `yarn`. See [issue](https://github.com/unicode-org/full-icu-npm/issues/9).

So for now, we bundle this `full-icu` dependency in this `vendors` folder.
