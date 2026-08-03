#!/usr/bin/env bash

set -e

# Vercel runs postinstall under its global pnpm (9.x), which trips this repo's engines.pnpm floor; skip dev-only setup there.
if [ -n "$VERCEL" ]; then
  echo "Skipping postinstall on Vercel."
  exit 0
fi

if [ -n "$SKIP_POSTINSTALL_DEV_SETUP" ]; then
  echo "Skipping development setup."

else
  echo "Preparing development setup."
  pnpm husky
  pnpm manypkg check
  pnpm preconstruct dev

fi

echo "Running prettier on package.json files"
# We need to run prettier to avoid unnecessary formatting changes to package.json (due to pnpm install).
pnpm prettier --write --parser json '**/package.json' &>/dev/null