<div align=center>
  <img src="https://i.imgur.com/9E1mdCY.png" alt="runback-logo" width="500">
  <p>
    Broadcast graphics for fighting games
  </p>
</div>

## Table of Contents
* [1&nbsp;&nbsp;Features](#features)
* [2&nbsp;&nbsp;Installation](#installation)
* [3&nbsp;&nbsp;Meta](#meta)
  * [3.1&nbsp;&nbsp;License](#license)
  * [3.2&nbsp;&nbsp;Built With](#built-with)
  * [3.3&nbsp;&nbsp;Acknowledgments](#acknowledgements)

## Features
  * Easy-to-use interface
  * Beautiful overlays
  * Persistant player database
  * Player import and export via JSON
  * smash.gg integration

## Installation
Ensure Node, npm, and yarn are installed.

Clone and build the repo:
```
$ git clone https://github.com/opeik/nodecg.git
$ cd nodecg && npm install --production && cd bundles
$ git clone https://github.com/opeik/runback.git
$ cd runback && yarn install && yarn build
```
Start the NodeCG server:
```
$ cd ../.. && node index.js
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

### Acknowledgments
* Inspired by [ssbutw](https://github.com/crs38c28/ssbutw)
