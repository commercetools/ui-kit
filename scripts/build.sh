#!/usr/bin/env bash

set -e

yarn generate-icons
yarn design-tokens:build
yarn compile-intl

yarn preconstruct build

yarn workspace @commercetools-frontend/ui-kit copy-assets
