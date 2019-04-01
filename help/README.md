# HELP

### Prerequisites

1. Register to [cloud.ibm.com](https://cloud.ibm.com/)

2. Generate PROMO CODE at [ibm.onthehub.com](https://ibm.onthehub.com)

3. Add PROMO CODE to your cloud.ibm.com account

### Requirements

#### 1. Ubuntu 16.04.6 LTS

[Download](https://www.ubuntu.com/download/alternative-downloads)

#### 2. Cloud Foundry Command Line Interface

[Documentation](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html)

* Install
```sh
wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | sudo apt-key add -
echo "deb https://packages.cloudfoundry.org/debian stable main" | sudo tee /etc/apt/sources.list.d/cloudfoundry-cli.list
sudo apt-get update
sudo apt-get install cf-cli
```

#### 3. IBM Cloud Command Line Interface

[Documentation](https://cloud.ibm.com/docs/cli?topic=cloud-cli-ibmcloud-cli#ibmcloud-cli)

* Install
```sh
curl -sL https://ibm.biz/idt-installer | bash
```

* Verify
```sh
ibmcloud dev help
```

* Login
```sh
ibmcloud login --sso
# select "3. eu-de"
```

* Add API endpoint
```sh
# germany is nearest one
ibmcloud target --cf-api https://api.eu-de.bluemix.net
```
