#!/usr/bin/env bash

set -e

pnpm generate-icons
pnpm design-tokens:build
pnpm compile-intl

# --- declaration-emit leak workaround (FEC-938) ---
# `@commercetools-frontend/ui-kit` (the aggregate preset) is a root
# devDependency because the .visualroute/bundlespec fixtures import it. Under
# strict pnpm that puts a `node_modules/@commercetools-frontend/ui-kit` symlink
# in place, and preconstruct's declaration emit then prefers that resolvable
# bare specifier over the in-package relative path — leaking
# `import("@commercetools-frontend/ui-kit").T...Props` into the published .d.ts
# of the compound components (constraints, radio-input, view-switcher). Strict
# consumers can't resolve it, so those prop types collapse to `any`.
#
# preconstruct does not need that symlink (the fixtures aren't part of the dts
# program), so we hide it during the build to force the correct relative
# specifier, and restore it afterwards (and on any exit).
META_SYMLINK="node_modules/@commercetools-frontend/ui-kit"
META_SYMLINK_TARGET=""
restore_meta_symlink() {
  if [ -n "$META_SYMLINK_TARGET" ] && [ ! -e "$META_SYMLINK" ]; then
    ln -s "$META_SYMLINK_TARGET" "$META_SYMLINK"
  fi
}
if [ -L "$META_SYMLINK" ]; then
  META_SYMLINK_TARGET="$(readlink "$META_SYMLINK")"
  trap restore_meta_symlink EXIT
  rm "$META_SYMLINK"
fi

pnpm preconstruct build

restore_meta_symlink
trap - EXIT
# --- end workaround ---

pnpm --filter @commercetools-frontend/ui-kit run copy-assets
