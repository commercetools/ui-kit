---
'@commercetools-uikit/design-system': major
---

**BREAKING CHANGE**

Last year we worked on a new look and field for the UI-Kit and, in order to help transitioning from the old to the new one, we introduced many new design tokens so we could have two UI versions for the components.
This was a temporary solution and those tokens are now being removed.

We're releasing a breaking change version because those tokens that we had introduced are now being removed and they were technically publicly available by using the `@commercetools-uikit/design-system` package.

We don't expect this change to affect many users as we didn't announced those new tokens when we introduced them, but we want to be transparent and let everyone know about this change.

You can check the list of removed design tokens by taking a look at [this PR](https://github.com/commercetools/ui-kit/pull/2703/), focusing in the [`definition.yml` file](https://github.com/commercetools/ui-kit/pull/2703/files#diff-0a1f6474acc1533b80254d0ada759d9fc9e40138445deec296b1030247d37fae).
