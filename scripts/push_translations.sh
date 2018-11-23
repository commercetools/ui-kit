#!/usr/bin/env bash

set -e

: "${TRANSIFEX_PASSWORD?Required env variable TRANSIFEX_PASSWORD}"

# Always skip it if it's not master branch
if [ "$TRAVIS_BRANCH" == "master" ]; then
  echo "Writing transifex configuration"
  cat > "$TRAVIS_BUILD_DIR/.transifexrc" << EOF
[https://www.transifex.com]
hostname = https://www.transifex.com
password = $TRANSIFEX_PASSWORD
username = api
EOF

  echo "Pushing source file for translations"
  tx push -s
else
  echo "Not on master branch, skipping job"
fi
