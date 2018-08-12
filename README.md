# TRONMASK

TronMask is browser extension wallet for Tron. We don't save the private key in our server. The private key is stored locally in the browser and encrypted. For safety, always logout your wallet after using it.

Download and install TronMask from [Google Chrome Web Store](https://chrome.google.com/webstore/detail/tronmask/egfbimboljdebhepefdiolkpdbiaaggp).

![TronMask](https://user-images.githubusercontent.com/1266907/43358441-00cf0ae2-92bc-11e8-921b-131d3f8297af.png)

## Features
* Generate a new wallet.
* Import wallet from private key.
* Export private key.
* View TRX balances.
* View all token balances.
* View Bandwith, Tron Power and Frozen TRX.
* View wallet address with the QR code.
* View recent transfers & transactions.
* Send & receive TRX and other tokens.
* Freeze & unfreeze TRX.
* Switch the network to Mainnet or Testnet.
* Votes for Super Representatives.

## Manual Installation
* Download `tronmask.zip` from the [latest release](https://github.com/hisman/tronmask/releases/latest).
* Unzip `tronmask.zip`.
* Go to Chrome Extensions page and activate the Developer Mode.
* Click `Load Unpacked` button and point it to `tronmask` folder.

## Build Extension

* Install [node.js](https://nodejs.org/) and npm.
* Install dependencies :
  ```
  npm install
  ```
* Build the project :
  ```
  npm run build
  ```
* Uncompressed build can be found in `/dist` folder, compressed build is `tronmask.zip`.
* Go to Chrome Extensions page and activate the Developer Mode.
* Click `Load Unpacked` button and point it to `/dist` folder.

## Development
* Install [node.js](https://nodejs.org/) and npm.
* Install dependencies :
  ```
  npm install
  ```
* Run the project :
  ```
  npm run dev
  ```
* Go to Chrome Extensions page and activate the Developer Mode.
* Click `Load Unpacked` button and point it to `/dist` folder, the extension will be autoreloading as you change the codes.

## Tech
* This wallet is built with [Vue.js](https://vuejs.org/).
* We are using [Tronscan](https://tronscan.org/#/) API for both Mainnet and Testnet connection.
