#!/usr/bin/env bash

set -e

if [ -n "$SKIP_POSTINSTALL_DEV_SETUP" ]; then
  echo "Skipping development setup."

else
  echo "Preparing development setup."
  pnpm husky install
  pnpm manypkg check
  pnpm preconstruct dev

fi

echo "Running prettier on package.json files"
# We need to run prettier to avoid unnecessary formatting changes to package.json (due to pnpm install).
pnpm prettier --write --parser json '**/package.json' &>/dev/null

echo "Patching packages"
pnpm patch-package

if [ -n "$SKIP_INSTALL_STORYBOOK" ]; then
  echo "Skipping installation of Storybook dependencies."

else
  echo "Installing dependencies for Storybook."
  pushd docs/
  pnpm install

fi
