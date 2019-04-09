# HELP

### About

Step-by-step instruction guide.

### Prerequisites

1. Register to [cloud.ibm.com](https://cloud.ibm.com/)

2. Generate PROMO CODE at [ibm.onthehub.com](https://ibm.onthehub.com)

3. Add PROMO CODE to your cloud.ibm.com account

### Requirements

1. Ubuntu 16.04.6 LTS

  * [Download](https://www.ubuntu.com/download/alternative-downloads)

2. Cloud Foundry Command Line Interface

  * [Documentation](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html)

  * Install
  ```sh
  wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | sudo apt-key add -
  echo "deb https://packages.cloudfoundry.org/debian stable main" | sudo tee /etc/apt/sources.list.d/cloudfoundry-cli.list
  sudo apt-get update
  sudo apt-get install cf-cli
  ```

3. IBM Cloud Command Line Interface

  * [Documentation](https://cloud.ibm.com/docs/cli?topic=cloud-cli-ibmcloud-cli#ibmcloud-cli)

  1. Install
  ```sh
  curl -sL https://ibm.biz/idt-installer | bash
  ```

  2. Verify
  ```sh
  ibmcloud dev help
  ```

  3. Login to **YOUR** account
  ```sh
  ibmcloud login --sso
  # select "3. eu-de"
  ```

  4. Add API endpoint
  ```sh
  # germany is nearest one
  cf api https://api.eu-de.bluemix.net
  ```

  6. Add organization & space
  ```sh
  ibmcloud target -o PA181.org -s PA181.space
  ```

  7. Verify it via `ibmcloud target` and the output should be
  ```
  API endpoint:      https://cloud.ibm.com
  Region:            eu-de
  User:              email@example.com
  Account:           Name Surname's Account (abcdefghijklmnopqrstuvwxyz123456)
  Resource group:    Default
  CF API endpoint:   https://api.eu-de.bluemix.net (API version: 2.106.0)
  Org:               PA181.org
  Space:             PA181.space
  ```

### Local setup

  1. Clone this repository (using ssh)
  ```sh
  git clone git@github.com:europ/MUNI-FI-PA181.git
  ```

  2. Follow the instruction in [`src/help/README.md`](https://github.com/europ/MUNI-FI-PA181/tree/master/src/help/README.md)

### Manual Deployment

  1. Execute
  ```sh
  cf api https://api.eu-de.bluemix.net # Set or view target api url
  cf login # Log user in

  2. Go to [`src/` folder](https://github.com/europ/MUNI-FI-PA181/tree/master/src) - folder must contain `manifest.yml` configuration file.
  ```sh
  cf push # Push a new app or sync changes to an existing app
  ```

  3. Verify
  ```sh
  cf apps # status report
  ```

### FAQ & Troubleshooting

  Please see [issues](https://github.com/europ/MUNI-FI-PA181/issues) (open/closed) of this repository.
