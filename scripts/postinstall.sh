#!/usr/bin/env bash

set -e

echo "Preparing development setup."
yarn husky install
yarn manypkg check
yarn preconstruct dev
yarn patch-package
yarn --cwd docs
