#!/bin/bash

# skip percy builds when this is not a pull request or when it's not master
if [[ $TRAVIS_PULL_REQUEST != 'false' || ${TRAVIS_BRANCH} == 'master' ]]
  then
  # skip percy builds when pull request is opened by a robot
  regexp='^renovate\/'
  if ! [[ ${TRAVIS_PULL_REQUEST_BRANCH} =~ ${regexp} ]]
    then
      yarn percy
    else
      echo 'Skipping percy - PR opened by `renovate`'
  fi
else
  echo 'Skipping percy build'
fi
