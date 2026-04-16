#!/usr/bin/env bash
#
# Create a single aggregate GitHub release from changesets/action's
# publishedPackages output.
#
# Replaces the fork-only `createGithubReleases: aggregate` behavior from
# dotansimha/changesets-action with an upstream-compatible equivalent.
#
# Required env vars:
#   RELEASE_VERSION     e.g. "20.5.0" — used as the release tag/title (prefixed with "v")
#   PUBLISHED_PACKAGES  JSON array from steps.changesets.outputs.publishedPackages,
#                       e.g. '[{"name":"@scope/pkg","version":"1.2.3"}, ...]'
#   GITHUB_TOKEN        Token with contents:write on the repo (not required when DRY_RUN=true).
#
# Optional env vars:
#   DRY_RUN             If "true", print the assembled release body to stdout
#                       instead of creating the GitHub release. Used by the
#                       accompanying .test.sh file.

set -euo pipefail

: "${RELEASE_VERSION:?RELEASE_VERSION is required}"
: "${PUBLISHED_PACKAGES:?PUBLISHED_PACKAGES is required}"
if [ "${DRY_RUN:-false}" != "true" ]; then
  : "${GITHUB_TOKEN:?GITHUB_TOKEN is required}"
fi

tag="v${RELEASE_VERSION}"
body_file=$(mktemp)
map_file=$(mktemp)

# Build a name -> path map from every workspace package.json.
while IFS= read -r pkg_json; do
  name=$(jq -r '.name // empty' "$pkg_json" 2>/dev/null || true)
  if [ -n "$name" ]; then
    printf '%s\t%s\n' "$name" "$(dirname "$pkg_json")" >> "$map_file"
  fi
done < <(find . -name package.json -not -path '*/node_modules/*' -type f)

# For each published package, extract its CHANGELOG section for the published
# version and append to the aggregate release body.
#
# The awk block skips blank lines before the first content, buffers interior
# blank lines (flushing them only when followed by real content), and exits on
# the next `## ` heading — so trailing blanks before the next version don't
# leak into the output.
while IFS= read -r pkg; do
  name=$(echo "$pkg" | jq -r '.name')
  version=$(echo "$pkg" | jq -r '.version')
  path=$(awk -F'\t' -v n="$name" '$1 == n { print $2; exit }' "$map_file")
  section=""
  if [ -n "$path" ] && [ -f "$path/CHANGELOG.md" ]; then
    section=$(awk -v v="$version" '
      /^## / {
        if (in_section) exit
        h = $0; sub(/^## /, "", h)
        if (h == v) in_section = 1
        next
      }
      in_section {
        if (!started && $0 == "") next
        started = 1
        if ($0 == "") { pending = pending "\n"; next }
        print pending $0
        pending = ""
      }
    ' "$path/CHANGELOG.md")
  fi
  printf '## %s@%s\n\n%s\n\n' "$name" "$version" "$section" >> "$body_file"
done < <(echo "$PUBLISHED_PACKAGES" | jq -c '.[]')

if [ "${DRY_RUN:-false}" = "true" ]; then
  cat "$body_file"
  exit 0
fi

gh release create "$tag" --title "$tag" --notes-file "$body_file"
