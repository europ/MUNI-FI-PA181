# LOCAL SETUP

### About

This project was based on [this](https://github.com/IBM-Cloud/aspnet-core-helloworld/) template.

### Prerequisites

1. [Install .NET Core 2.2 SDK on Linux Ubuntu 16.04 - x64](https://dotnet.microsoft.com/download/linux-package-manager/ubuntu16-04/sdk-2.2.202)

  ```sh
  wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb
  sudo dpkg -i packages-microsoft-prod.deb
  sudo apt-get install apt-transport-https
  sudo apt-get update
  sudo apt-get install dotnet-sdk-2.2
  ```

### Local run

1. Go to the [project directory](https://github.com/europ/MUNI-FI-PA181/blob/master/src/src/API).

2. Run
  ```sh
  dotnet restore # Restores the dependencies for a given application.
  dotnet run # Runs the application from source.
  ```

3. Open http://localhost:5000
