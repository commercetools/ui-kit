#!/usr/bin/env bash

set -e

echo "Preparing development setup."
yarn husky install
yarn manypkg check
yarn preconstruct dev
# We need to run prettier to avoid unnecessary formatting changes to package.json (due to Yarn install).
yarn prettier --write --parser json '**/package.json' &>/dev/null

yarn patch-package

if [ -n "$SKIP_INSTALL_STORYBOOK" ]; then
  echo "Skipping installation of Storybook dependencies."

else
  echo "Installing dependencies for Storybook."
  yarn --cwd docs

fi
