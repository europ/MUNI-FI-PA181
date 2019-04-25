#!/bin/bash

# ENVIROMENT PROPERTIES
# TOKEN - github personal access token - 'repo:status' only
# REPO - string in format 'RepoOwner/RepoName'

if [[ -z "${TOKEN}" || -z "${REPO}" ]]; then
  echo -e "\033[1;31mMissing environment properties (\$REPO or \$TOKEN)\!\033[0m"
  exit 1
fi

cd src # directory including source files

SHA=$(git rev-parse HEAD) # commit hash (latest commit)

STATUS="pending"
echo -e "\033[1;33mSTATUS=$STATUS\033[0m"

curl \
  --header "Authorization: token ${TOKEN}" \
  --url "https://api.github.com/repos/${REPO}/statuses/${SHA}" \
  --data "{\"state\": \"${STATUS}\", \"context\": \"IBM Cloud\", \"description\": \"Deployment\", \"target_url\": \"http://cloud.ibm.com/\"}" \
  --output /dev/null

cf push "${CF_APP}"
if [ $? -eq 0 ]; then export STATUS="success"; else export STATUS="error"; fi
echo -e "\033[1;33mSTATUS=$STATUS\033[0m"

curl \
  --header "Authorization: token ${TOKEN}" \
  --url "https://api.github.com/repos/${REPO}/statuses/${SHA}" \
  --data "{\"state\": \"${STATUS}\", \"context\": \"IBM Cloud\", \"description\": \"Deployment\", \"target_url\": \"http://cloud.ibm.com/\"}" \
  --output /dev/null
