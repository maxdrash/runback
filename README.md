<div align=center>
  <img src="https://i.imgur.com/9E1mdCY.png" alt="runback-logo" width="500">
  <p>
    Broadcast graphics for fighting games
  </p>
</div>

## Table of Contents
* [1&nbsp;&nbsp;Features](#features)
* [2&nbsp;&nbsp;Installing](#installing)
* [2&nbsp;&nbsp;Building](#building)
* [3&nbsp;&nbsp;Meta](#meta)
  * [3.1&nbsp;&nbsp;License](#license)
  * [3.2&nbsp;&nbsp;Built With](#built-with)
  * [3.3&nbsp;&nbsp;Acknowledgments](#acknowledgements)

## Features
  * Easy-to-use web interface
  * Animated scoreboard overlay
  * Persistant player database
  * Player import and export via JSON

## Planned Features
  * smash.gg integration

## Installing
Please check the [releases](https://github.com/opeik/runback/releases) tab for
the latest release of Runback.

## Building
*Ensure node, npm, and yarn are installed.*

Clone runback:
```
$ eval "$(curl -sSfL https://git.io/Jvcof)"
```
Build runback:
```
$ yarn build
```
Or, if you want to rebuild as you make changes:
```
$ yarn watch
```
Finally, start the runback server:
```
$ yarn start
```

## Meta
### License
This project is licensed under the ISC license. Please see the [`LICENSE.md`](LICENSE.md)
file for details.

### Built With
* NodeCG
* Vue
* Vuetify

### Acknowledgments
* Inspired by [ssbutw](https://github.com/crs38c28/ssbutw)
