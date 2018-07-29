# TRONMASK

TronMask is browser extension wallet for Tron. We don't save any wallet informations in our server. All the wallet informations including the private key are saved in the browser.

![TronMask](https://user-images.githubusercontent.com/1266907/43358441-00cf0ae2-92bc-11e8-921b-131d3f8297af.png)

## Manual Installation
* Download `tronmask.zip` from the [latest release](https://github.com/hisman/tronmask/releases/latest)
* Unzip `tronmask.zip`
* Go to Chrome Extensions page and activate the Developer Mode
* Click `Load Unpacked` button and point it to `tronmask` folder

## Build Extension

* Install [node.js](https://nodejs.org/) and npm
* Install dependencies :
  ```
  npm install
  ```
* Build the project :
  ```
  npm run build
  ```
* Uncompressed build can be found in `/dist` folder, compressed build is `tronmask.zip`
* Go to Chrome Extensions page and activate the Developer Mode
* Click `Load Unpacked` button and point it to `/dist` folder

## Development
* Install [node.js](https://nodejs.org/) and npm
* Install dependencies :
  ```
  npm install
  ```
* Run the project :
  ```
  npm run dev
  ```
* Go to Chrome Extensions page and activate the Developer Mode
* Click `Load Unpacked` button and point it to `/dist` folder, the extension will be autoreloading as you change the codes

## Tech
* This wallet is built with [Vue.js](https://vuejs.org/)
* We are using [Tronscan](https://tronscan.org/#/) API for both Mainnet and Testnet connection
