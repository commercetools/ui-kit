#!/usr/bin/env bash

set -e

echo "Preparing development setup."
yarn husky install
yarn manypkg check
yarn preconstruct dev
yarn patch-package

if [ -n "$SKIP_INSTALL_STORYBOOK" ]; then
  echo "Skipping installation of Storybook dependencies."

else
  echo "Installing dependencies for Storybook."
  yarn --cwd docs

fi
