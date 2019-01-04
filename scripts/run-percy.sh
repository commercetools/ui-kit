#!/bin/bash

# skip percy builds when this is not a pull request or when it's not master
if [[ $TRAVIS_PULL_REQUEST != 'false' || ${TRAVIS_BRANCH} == 'master' ]]
  then
  # skip percy builds when pull request is opened by a renovate
  # if renovate opens an average of 6 PRs per week, that means, 24 PRs per month.
  # 24 * ~50 snapshots = 1200, or almost 25% of our current percy snapshot allowances.
  # if in the future, we drop more 💸 on percy, we can remove this.
  regexp='^renovate\/'
  if ! [[ ${TRAVIS_PULL_REQUEST_BRANCH} =~ ${regexp} ]]
    then
      yarn visual-testing-app:build && yarn percy --reporters jest-silent-reporter
    else
      echo 'Skipping percy - PR opened by `renovate`'
  fi
else
  echo 'Skipping percy build'
fi
