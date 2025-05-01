# Contract Example

Contracts on Trac Network are infrastructure. 

This means that either each participant executes contracts in distributed apps (embedded contracts).
Alternatively a group of Peers (nodes) may accept transactions from external wallets to offer a web3 experience.

The most important files to check out and learn how everything works are:

- /contract/protocol.js: defines the framework for the contract.
- /contract/contract.js: the actual contract.
- /index.js: the setup for the contract app that everyone uses (basicall the entire package represents an app)

Release 1 (R1) must be used alongside Trac Network R1 releases to maintain contract consistency.

Trac Apps utilizes the [Pear Runtime and Holepunch](https://pears.com/).

## Install

```shell
git clone git@github.com:Trac-Systems/trac-contract-example.git
```

## Usage

While the Trac apps support native node-js, it is encouraged to use Pear:

```js
cd trac-contract-example
npm install -g pear
npm install
pear run . store1
```

**Deploy Bootstrap (admin):**

- Choose option 1)
- Copy and backup the seedphrase
- Copy the "Peer Writer" key from the Peer section
- With a text editor, open the file index.js in document root
- Replace the bootstrap address in the example section (not the MSB) with the copied writer address
- Choose a channel name (exactly 32 characters)
- Run again: pear run . store1
- After the options appear, type "/add_admin --address <Peer Address>" and hit enter
- Your instance is now the Bootstrap and admin peer of your contract network.
- Keep your bootstrap node running
- For production contracts, it is strongly recommended to add a couple of indexers. See below.

**Running indexers (admin)**

- Install on different machines than the Bootstrap's (ideally different data centers) with the exact setup in index.js
- Upon start ("pear run . store1") copy the "Peer Writer" key
- In the Bootstrap node screen, add the indexer: "/add_indexer --key <Peer Writer key>"
- You should see a success confirmation
- Usually 2 indexers on different locations are enough, we recommend 2 to max. 4 in addition to the Bootstrap

**Enable others to join and to transact:**

- By default, people cannot auto-join the contract network. The network admin (the Bootstrap in this case) can enable auto-join
- To enable auto-join, in the screen of the Bootstrap enter "/set_auto_add_writers --enabled 1"
- Any other Peer joining with the exact same setup can join the network and execute contract functions and transactions.
- Users may join using the exact same setup in index.js and start using "pear run . store1"
- For more features, play around with the evailable system and chat options.