#!/usr/bin/env bash

set -e

pnpm generate-icons
pnpm design-tokens:build
pnpm compile-intl

pnpm preconstruct watch
