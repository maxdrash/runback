<div align=center>
  <img src="https://i.imgur.com/9E1mdCY.png" alt="runback-logo" width="300">
  <p>
    <b>
      Broadcast graphics for fighting games
    </b>
  </p>
</div>

---

## Table of Contents
* [1 Features](#features)
* [2. Installation](#installation)
* [3. Meta](#meta)
  * [3.1 License](#license)
  * [3.2 Built With](#built-with)
  * [3.3 Acknowledgments](#acknowledgements)

## Features
  * Easy-to-use interface
  * Beautiful overlays
  * Persistant player database
  * Player import and export via JSON
  * smash.gg integration

## Installation
Install Node

https://nodejs.org/en/download/package-manager/

Install yarn
```
npm -g install yarn
```

Clone and build the repo
```
git clone https://github.com/opeik/nodecg.git
cd nodecg && npm install --production && cd bundles
git clone https://github.com/opeik/runback.git
cd runback && yarn install && yarn build
```
Finally, start the NodeCG server
```
cd ../.. && node index.js
```

## Meta
### License
This project is licensed under the ISC license. Please see the [`LICENSE.md`](LICENSE.md)
file for details.

### Built With
* NodeCG
* Vue
* Vuetify
* Typescript
* JSON Schema

### Acknowledgments
* Inspired by [ssbutw](https://github.com/crs38c28/ssbutw)
