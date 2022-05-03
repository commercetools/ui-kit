#!/usr/bin/env bash

set -e

yarn generate-icons
yarn design-tokens:build
yarn compile-intl

yarn preconstruct watch
