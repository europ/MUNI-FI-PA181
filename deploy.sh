#!/bin/bash


# === REQUIRED ENVIROMENT PROPERTIES ===
#  TOKEN      - github personal access token ('repo' access enabled)
#  REPO       - GitHub repository name (string in format 'RepoOwner/RepoName')
#  GIT_COMMIT - GitHub commit (SHA hash of the commit)


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

# USAGE: commit_comment "message"
commit_comment() {
  echo -e "\033[1;33mCOMMIT COMMENT='${1}'\033[0m"

  curl \
  --silent \
  --show-error \
  --header "Authorization: token ${TOKEN}" \
  --data "{\"body\": \"${1}\"}" \
  --url "https://api.github.com/repos/${REPO}/commits/${GIT_COMMIT}/comments" \
  --output /dev/null

  echo -e "\033[0;33mCOMMIT COMMENT SET\033[0m"
}


# Check the environment variables
[[ -z "${TOKEN}" ]] && error "Missing environment property 'TOKEN'\!"
[[ -z "${REPO}" ]] && error "Missing environment property 'REPO'\!"
[[ -z "${GIT_COMMIT}" ]] && error "Missing environment property 'GIT_COMMIT'\!"


cd src # directory including source files

create_status "pending"

cf push "${CF_APP}" # deploy the application

if [ $? -eq 0 ]; then
  create_status "success"
  COMMENT_BODY=":information_source: IBM Cloud [toolchain](https://console.bluemix.net/devops/toolchains/0d122658-46e5-4981-a505-de8c1bcf2060?env_id=ibm%3Ayp%3Aeu-de 'PA181'): [Delivery Pipeline](https://console.bluemix.net/devops/pipelines/34a6147f-ccb6-4a7e-9046-fa62588bd17f?env_id=ibm%3Ayp%3Aeu-de 'PA181') deployed [MUNI-FI-PA181](https://github.com/europ/MUNI-FI-PA181/releases/tag/deploy-ibm-yp-eu-de-PA181.org-PA181.space-20190419-211402 'deploy-ibm-yp-eu-de-PA181.org-PA181.space-20190419-211402') to [PA181.space](https://console.bluemix.net/apps/e12bc2b1-2120-4f57-b8e6-8351beb45553?env_id=ibm:yp:eu-de 'ibm:yp:eu-de:PA181.org:PA181.space'), including this commit :round_pushpin:"
  commit_comment "${COMMENT_BODY}"
else
  create_status "error"
  COMMENT_BODY=":warning: IBM Cloud [toolchain](https://console.bluemix.net/devops/toolchains/0d122658-46e5-4981-a505-de8c1bcf2060?env_id=ibm%3Ayp%3Aeu-de 'PA181'): [Delivery Pipeline](https://console.bluemix.net/devops/pipelines/34a6147f-ccb6-4a7e-9046-fa62588bd17f?env_id=ibm%3Ayp%3Aeu-de 'PA181') **failed** to deploy [MUNI-FI-PA181](https://github.com/europ/MUNI-FI-PA181/releases/tag/deploy-ibm-yp-eu-de-PA181.org-PA181.space-20190419-211402 'deploy-ibm-yp-eu-de-PA181.org-PA181.space-20190419-211402') to [PA181.space](https://console.bluemix.net/apps/e12bc2b1-2120-4f57-b8e6-8351beb45553?env_id=ibm:yp:eu-de 'ibm:yp:eu-de:PA181.org:PA181.space') :heavy_exclamation_mark:"
  commit_comment "${COMMENT_BODY}"
fi

exit 0
