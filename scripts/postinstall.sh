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
pnpm prettier --write --parser json '**/package.json' &>/dev/null

echo "Patching packages"
pnpm patch-package
