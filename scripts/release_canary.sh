#!/usr/bin/env bash

set -e

: "${NPM_TOKEN?Required env variable NPM_TOKEN}"
: "${CIRCLE_WORKING_DIRECTORY?Required env variable CIRCLE_WORKING_DIRECTORY}"

COMMIT_MESSAGE=$(git log --format=oneline -n 1 $CIRCLE_SHA1)

# Only trigger the canary release when:
# - the commit message does not contain `[skip publish]`
if [[ ! "$COMMIT_MESSAGE" =~ \[skip\ publish\] ]]; then
  echo "Configuring npm for automation bot"

  cat > .npmrc << EOF
email=npmjs@commercetools.com
//registry.npmjs.org/:_authToken=$NPM_TOKEN
EOF

  echo "Releasing canary version"
  yarn release:canary

else
  echo "Skipping release due to commit message..."
fi
