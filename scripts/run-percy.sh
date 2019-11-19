#!/bin/bash

# skip percy builds when this is not a pull request or when it's not master
if [[ -n $CIRCLE_PULL_REQUEST || ${CIRCLE_BRANCH} == 'master' ]]
  then
    echo 'Skipping'
    # yarn visual-testing-app:build && yarn percy --reporters jest-silent-reporter
else
  echo 'Skipping percy build'
fi
