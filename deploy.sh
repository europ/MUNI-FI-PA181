#!/bin/bash


# ENVIROMENT PROPERTIES
# TOKEN - github personal access token
# REPO - The Git repository name - string in format 'RepoOwner/RepoName'
# GIT_COMMIT - The Git commit - SHA


# USAGE: error "message"
error() {
  echo -e "\033[1;31m${1}\033[0m"
  exit 1
}

# USAGE: create_status "status"
create_status() {
  echo -e "\033[1;33mCOMMIT STATUS=${1}\033[0m"

  curl \
  --silent \
  --show-error \
  --header "Authorization: token ${TOKEN}" \
  --data "{\"state\": \"${1}\", \"context\": \"IBM Cloud\", \"description\": \"Deployment\", \"target_url\": \"http://cloud.ibm.com/\"}" \
  --url "https://api.github.com/repos/${REPO}/statuses/${GIT_COMMIT}" \
  --output /dev/null

  echo -e "\033[0;33mCOMMIT STATUS '${1}' SET\033[0m"
}


[[ -z "${TOKEN}" ]] && error "Missing environment property 'TOKEN'\!"
[[ -z "${REPO}" ]] && error "Missing environment property 'REPO'\!"
[[ -z "${GIT_COMMIT}" ]] && error "Missing environment property 'GIT_COMMIT'\!"

cd src # directory including source files

create_status "pending"
cf push "${CF_APP}"
if [ $? -eq 0 ]; then create_status "success"; else create_status "error"; fi

exit 0
