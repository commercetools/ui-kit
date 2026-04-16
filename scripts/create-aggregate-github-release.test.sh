#!/usr/bin/env bash
#
# Tests create-aggregate-github-release.sh against a fake workspace.
# Run: bash scripts/create-aggregate-github-release.test.sh

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
script="$script_dir/create-aggregate-github-release.sh"

test_dir=$(mktemp -d)
trap 'rm -rf "$test_dir"' EXIT
cd "$test_dir"

mkdir -p packages/pkg-a packages/pkg-b packages/pkg-c

cat > packages/pkg-a/package.json <<'JSON'
{"name": "@scope/pkg-a", "version": "1.2.3"}
JSON

cat > packages/pkg-a/CHANGELOG.md <<'MD'
# @scope/pkg-a

## 1.2.3

### Minor Changes

- [#42](https://example.com/pr/42) Add widget

## 1.2.2

### Patch Changes

- [#41] Old fix
MD

cat > packages/pkg-b/package.json <<'JSON'
{"name": "@scope/pkg-b", "version": "0.5.0"}
JSON

cat > packages/pkg-b/CHANGELOG.md <<'MD'
# @scope/pkg-b

## 0.5.0

### Patch Changes

- Updated dependencies []:
  - @scope/pkg-a@1.2.3
MD

# pkg-c: no CHANGELOG (empty section scenario)
cat > packages/pkg-c/package.json <<'JSON'
{"name": "@scope/pkg-c", "version": "0.0.1"}
JSON

export RELEASE_VERSION="1.2.3"
export PUBLISHED_PACKAGES='[{"name":"@scope/pkg-a","version":"1.2.3"},{"name":"@scope/pkg-b","version":"0.5.0"},{"name":"@scope/pkg-c","version":"0.0.1"}]'
export DRY_RUN="true"

actual=$("$script")

expected='## @scope/pkg-a@1.2.3

### Minor Changes

- [#42](https://example.com/pr/42) Add widget

## @scope/pkg-b@0.5.0

### Patch Changes

- Updated dependencies []:
  - @scope/pkg-a@1.2.3

## @scope/pkg-c@0.0.1'

if [ "$actual" != "$expected" ]; then
  echo "FAIL: release body differs from expected" >&2
  diff <(printf '%s\n' "$expected") <(printf '%s\n' "$actual") >&2 || true
  exit 1
fi

echo "PASS: create-aggregate-github-release.sh body matches expected"
