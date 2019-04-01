# HELP

### About

Step-by-step instruction guide how to initialize, build & deploy [github.com/IBM-Bluemix/python-hello-world-flask](https://github.com/IBM-Bluemix/python-hello-world-flask).

### Prerequisites

1. Register to [cloud.ibm.com](https://cloud.ibm.com/)

2. Generate PROMO CODE at [ibm.onthehub.com](https://ibm.onthehub.com)

3. Add PROMO CODE to your cloud.ibm.com account

### Requirements

1. Ubuntu 16.04.6 LTS

  * [Download](https://www.ubuntu.com/download/alternative-downloads)

2. Python3.6

  * [Download](https://www.python.org/downloads/)

  * Install
  ```sh
  sudo add-apt-repository ppa:jonathonf/python-3.6
  sudo apt-get update
  sudo apt-get install python3.6 python3-pip
  ```

3. Cloud Foundry Command Line Interface

  * [Documentation](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html)

  * Install
  ```sh
  wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | sudo apt-key add -
  echo "deb https://packages.cloudfoundry.org/debian stable main" | sudo tee /etc/apt/sources.list.d/cloudfoundry-cli.list
  sudo apt-get update
  sudo apt-get install cf-cli
  ```

4. IBM Cloud Command Line Interface

  * [Documentation](https://cloud.ibm.com/docs/cli?topic=cloud-cli-ibmcloud-cli#ibmcloud-cli)

  1. Install
  ```sh
  curl -sL https://ibm.biz/idt-installer | bash
  ```

  2. Verify
  ```sh
  ibmcloud dev help
  ```

  3. Login
  ```sh
  ibmcloud login --sso
  # select "3. eu-de"
  ```

  4. Add API endpoint
  ```sh
  # germany is nearest one
  ibmcloud target --cf-api https://api.eu-de.bluemix.net
  ```

  **STOP HERE**, the following steps are for Adrian only

  5. Create an organization with relevant space

  6. Add organization & space
  ```sh
  ibmcloud target -o PA181.org -s PA181.space
  ```

5. Local setup

  1. Clone this repository (using ssh)
  ```sh
  git clone git@github.com:europ/MUNI-FI-PA181.git
  ```

  2. All source files of the project are located inside of `MUNI-FI-PA181/src` folder
  ```sh
  cd MUNI-FI-PA181/src
  ```

  3. Install the necessary requirements
  ```sh
  pip install -r requirements.txt
  ```

  4. Launch the application on localhost
  ```sh
  python hello.py
  ```

6. Deployment

  1. Execute
  ```sh
  cf api https://api.eu-de.bluemix.net
  cf login
  cf push
  ```

  2. Verify
  ```sh
  cf apps
  ```
