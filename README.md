# BlockApps Demo App

This project demonstrates a few of the BlockApps REST APIs which can be used to bootstrap simple blockchain functionality into an existing web or mobile app. In this example, we use our REST API to:

* create a blockchain user with an Ethereum address
* deploy a smart contract
* update a smart contract
* display some information about our blockchain node

BlockApps REST APIs come in two flavors: application-level and network-level. Most of the time, you'll be using our application-level API, called [Bloc](https://stratodev.blockapps.net/docs/?url=/bloc/v2.2/swagger.json), to execute basic CRUD functionality, like creating users, deploying contracts, and calling contract functions. Our network-level API, called [STRATO](https://stratodev.blockapps.net/docs/?url=/strato-api/eth/v1.2/swagger.json), offers advanced functionality to pull data directly from the [Merkle-Patricia trie](https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hash_Tree.svg/1200px-Hash_Tree.svg.png) of your Blockchain. 

For most use cases, the only STRATO API you'll need to use will be [`POST /faucet`](https://stratodev.blockapps.net/docs/?url=/strato-api/eth/v1.2/swagger.json) which adds Ether to a user account.

**Note**: User accounts start with a balance of 0, so you must faucet the account with Ether any time you create a user in order for the account to be functional. 

Another thing to keep in mind is that the API doesn't yet support user authentication. This means that we need to submit a username and password each time we want to create a transaction. To make this easier, I used [`async storage`](https://facebook.github.io/react-native/docs/asyncstorage.html) to store the user password for each session, but this is an insecure workaround and shouldn't be used for a production use case (but it's perfectly fine for demos and hackathons).

## APIs Used

| Description           | Route   | Location  |
| ------------- |:-------------:| -----:|
| Create User      | `POST /users/{user}` | `src/screens/Confirmation` |
| Faucet User      | `(STRATO-API) POST /faucet` | `src/screens/Confirmation` |
| Deploy Contract      | `POST /users/{user}/{userAddress}/contract/{contractName}/{contractAddress}/call`      |   `src/screens/ContractBuilder` |
| Call Contract Function      | `POST /users/{user}/{userAddress}/contract/{contractName}/{contractAddress}/call`      |   `src/screens/ContractBuilder` |
| Get Blockchain Info | `GET /apex-api/status`      |    `src/components/Sidebar` |

## Prerequisites

* [Running STRATO Instance](https://github.com/blockapps/strato-getting-started/)
* [React Native](https://facebook.github.io/react-native/docs/getting-started.html)
* XCode (requires iOS) 

## Running the App on Desktop Simulator

* `git clone https://github.com/mernit/ba-mobile`
* `cd ba-mobile`
* `npm i` 
* Edit the `env.js` file with the IP address of your STRATO node
* `npm run ios:start`
* The app should open in your iOS simulator.

## Running the App on an iPhone

* `git clone https://github.com/mernit/ba-mobile`
* `cd ba-mobile`
* `npm i` 
* Edit the `env.js` file with the IP address of your STRATO node
* `cd ios`
* `open MobileApp .xcworkspace` - XCode will open
* Plug your mobile phone into your computer - XCode should recognize it. Then, select your phone from the device dropdown and click `Build.` The app should begin to install on your phone 

## Contributing and Future Features

My goal is to develop a succinct app which shows off the extent of our REST API functionality. If you would like to contribute, here is a shortlist of easy-wins:

* ~~Allow user to select preconfigured contract to deploy in `ContractBuilder`~~
* ~~Create a page to [list](https://facebook.github.io/react-native/docs/flatlist.html) all contracts for a user account~~
* ~~Create a `ContractDetails` screen which allows the user to call functions on a contract~~
* Require username, address, and password at beginning of session and store in state. Currently, the username is stored only when an account is created.
* Migrate project to Redux 
