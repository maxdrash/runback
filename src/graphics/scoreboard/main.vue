<template>
  <div id="scoreboard">
    <div id="back-panel-wrapper">
      <img id="back-panel" src="./img/back.svg">
    </div>

    <div id="main-panel-wrapper">
      <img id="main-panel" src="./img/main.svg">

      <div id="progress-wrapper">
          <fit-text id="progress-text"
            unit="rem"
            :min="1.5"
            :max="progressTextFontSize()"
            >
            {{ local.progress }}
          </fit-text>
      </div>

      <div id="p1-games-text-wrapper" class="games-text-wrapper">
        <span class="games-text">
          {{ local.p1.games }}
        </span>
      </div>

      <div id="p2-games-text-wrapper" class="games-text-wrapper">
        <span class="games-text">
          {{ local.p2.games }}
        </span>
      </div>

      <div id="p1-name-wrapper" class="name-wrapper">
        <img src="./img/name1.svg">

        <div id="p1-name-text-wrapper" class="name-text-wrapper">

          <fit-text
            unit="rem"
            :min="1"
            :max="nameTextFontSize(0)"
            >

            <span class="team-text">
              {{ local.p1.team }}
            </span>

            <span class="gamertag-text">
              {{ local.p1.gamerTag }}
            </span>
          </fit-text>

        </div>

        <div id="p1-flag-wrapper" class="flag-wrapper">
          <div class="flag-mask">
            <img class="flag" :src="flagPath(local.p1.country)">
          </div>
        </div>
      </div>

      <div id="p2-name-wrapper" class="name-wrapper">
        <img src="./img/name2.svg">
        <div id="p2-name-text-wrapper" class="name-text-wrapper">

          <fit-text class="team-text"
            unit="rem"
            :min="1"
            :max="nameTextFontSize(1)"
            >
            <span class="team-text">
              {{ local.p2.team }}
            </span>

            <span class="gamertag-text">
              {{ local.p2.gamerTag }}
            </span>
          </fit-text>

        </div>

        <div id="p2-flag-wrapper" class="flag-wrapper">
          <div class="flag-mask">
            <img class="flag" :src="flagPath(local.p2.country)">
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { Players } from "schemas/players"
import { Scoreboard } from "schemas/scoreboard"
import { Bracket } from "schemas/bracket"

const BRACKET_RULES = require("@/rules/bracket.json")

@Component
export default class App extends Vue {
  @State("players") playersState!: Players
  @State("scoreboard") scoreboardState!: Scoreboard
  @State("bracket") bracketState!: Bracket

  local = {
    progress: "" as string,

    p1: {
      gamerTag: "" as string,
      team: "" as string,
      games: 0 as number,
      country: "" as string,

      updating: {
        name: false as boolean,
        games: false as boolean,
        country: false as boolean,
      }
    },

    p2: {
      gamerTag: "" as string,
      team: "" as string,
      games: 0 as number,
      country: "" as string,

      updating: {
        name: false as boolean,
        games: false as boolean,
        country: false as boolean,
      }
    }
  }

  readonly cjkFontSizeRatio = 0.85
  readonly nameTextFontSizeLatin: number = 2.8
  readonly progressTextFontSizeLatin: number = 2.1

  readonly progressList: Array<{text: string, value: number}> = BRACKET_RULES.progressList
  readonly sideList: Array<{text: string, value: number}> = BRACKET_RULES.sideList
  readonly finalsList: Array<{text: string, value: number}> = BRACKET_RULES.finalsList

  get players(): Players {
    return this.playersState
  }

  get scoreboard(): Scoreboard {
    return this.scoreboardState
  }

  get bracket(): Bracket {
    return this.bracketState
  }

  gamerTag(playerIndex: number): string {
    return this.scoreboard[playerIndex].shouldOverride ?
      this.scoreboard[playerIndex].gamerTagOverride :
      this.players[this.scoreboard[playerIndex].playerId].gamerTag
  }

  team(playerIndex: number): string {
    return this.scoreboard[playerIndex].shouldOverride ?
      this.scoreboard[playerIndex].teamOverride :
      this.players[this.scoreboard[playerIndex].playerId].team
  }

  country(playerIndex: number): string {
    return this.scoreboard[playerIndex].shouldOverride ?
      this.scoreboard[playerIndex].countryOverride :
      this.players[this.scoreboard[playerIndex].playerId].country
  }

  progress() : string {
    return this.bracket.shouldOverrideProgress ?
      this.bracket.customProgress :
      this.progressList[this.bracket.progress - 1].text
  }

  flagPath(country: string): string {
    return require("@/../node_modules/region-flags/svg/" +
      country.toUpperCase() + ".svg")
  }

  containsCjkCharacters(s: string): boolean {
    let regex = new RegExp('[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]')
    return regex.test(s)
  }

  nameTextFontSize(playerIndex: number): number {
    return this.containsCjkCharacters(this.team(playerIndex)) ||
           this.containsCjkCharacters(this.gamerTag(playerIndex)) ?
      this.nameTextFontSizeLatin * this.cjkFontSizeRatio :
      this.nameTextFontSizeLatin
  }

  progressTextFontSize(): number {
    return this.containsCjkCharacters(this.progress()) ?
      this.progressTextFontSizeLatin * this.cjkFontSizeRatio :
      this.progressTextFontSizeLatin
  }

  created(): void {
    this.local.p1.gamerTag = this.gamerTag(0)
    this.local.p1.team = this.team(0)
    this.local.p1.games = this.scoreboard[0].games
    this.local.p1.country = this.country(0)

    this.local.p2.gamerTag = this.gamerTag(1)
    this.local.p2.team = this.team(1)
    this.local.p2.games = this.scoreboard[1].games
    this.local.p2.country = this.country(1)

    this.local.progress = this.progress()
  }
}
</script>

<style>

:root {
  --main-panel-height: 60px;
  --main-panel-width: 409.28px;

  --back-panel-height: 50px;
  --back-panel-width: 596.6px;

  --name-panel-height: 50px;
  --name-panel-width: 499.19px;
  --name-panel-offset: calc(var(--name-panel-width) * 0.95 * -1);

  --flag-height: 50px;
  --flag-width: 120px;
  --flag-offset: calc(var(--flag-width) * (0.25 + 0.01));

  --name-text-width: calc(var(--name-panel-width) * 0.825);
  --name-text-height: calc(var(--name-panel-height) * 0.8);
  --name-text-offset-x: calc(var(--name-panel-width) * 0.075);
  --name-text-offset-y: calc(var(--name-panel-height) * 0.5 - (var(--name-text-height) * 0.5) );

  --games-text-width: calc(var(--main-panel-width) * 0.15);
  --games-text-height: calc(var(--main-panel-height) * 0.8);
  --games-text-offset-x: calc(var(--games-text-width) * 0.125);
  --games-text-offset-y: calc(var(--main-panel-height) * 0.5 - (var(--games-text-height) * 0.5) );

  --progress-text-width: calc(var(--main-panel-width) * 0.65);
  --progress-text-height: calc(var(--main-panel-height) * 0.55);
  --progress-text-offset-x: calc(var(--main-panel-width) * 0.5);
  --progress-text-offset-y: calc(var(--main-panel-height) * 0.375 - (var(--progress-text-height) * 0.5) );
}

img {
  height: 100%;
}

#scoreboard {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

#back-panel-wrapper {
  position: absolute;
  height: var(--back-panel-height);
  top: 0;
  left: 0;
  z-index: -2;
  transform: translateX(-50%) translate3d(0,0,0);
  animation: main-panel-in 0.5s forwards;
  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  opacity: 0;
}

#main-panel {
  filter: drop-shadow(0px 5px 5px #222);
}

#main-panel-wrapper {
  position: absolute;
  height: var(--main-panel-height);
  top: 0;
  left: 0;
  z-index: 0;
  transform: translateX(-50%);
  animation: main-panel-in 0.5s forwards;
  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  animation-delay: 0.15s;
  opacity: 0;
}

#progress-wrapper {
  position: absolute;
  top: var(--progress-text-offset-y);
  left: var(--progress-text-offset-x);
  width: var(--progress-text-width);
  height: var(--progress-text-height);
  line-height: var(--progress-text-height);
  text-align: center;
  transform: translateX(-50%);
}

#progress-text {
  color: white;
  font-family: "Bebas Neue Regular", "Rounded Mplus Regular";
}

#p1-name-wrapper {
  left: var(--name-panel-offset);
  padding-left: var(--flag-width);
  margin-left: calc(var(--flag-width) * -1);

  animation: p1-name-in 1s forwards;
  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  animation-delay: 0.75s;
}

#p2-name-wrapper {
  right: var(--name-panel-offset);
  padding-right: var(--flag-width);
  margin-right: calc(var(--flag-width) * -1);

  animation: p2-name-in 1s ease-in-out forwards;
  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  animation-delay: 0.75s;
}

#p1-flag-wrapper {
  left: var(--flag-offset);
  clip-path: polygon(0 0, 75% 0, 100% 100%, 25% 100%);

  animation: p1-flag-in 0.75s ease-in-out forwards;
  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  animation-delay: 0.9s;
}

#p2-flag-wrapper {
  right: var(--flag-offset);
  clip-path: polygon(25% 0, 100% 0, 75% 100%, 0 100%);

  animation: p2-flag-in 0.75s ease-in-out forwards;
  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  animation-delay: 0.9s;
}

#p1-name-text-wrapper {
  right: var(--name-text-offset-x);
  text-align: left;
}

#p2-name-text-wrapper {
  left: var(--name-text-offset-x);
  text-align: right;
}

#p1-games-text-wrapper {
  left: var(--games-text-offset-x);
}

#p2-games-text-wrapper {
  right: var(--games-text-offset-x);
}

.name-wrapper {
  position: absolute;
  height: var(--name-panel-height);
  top: 0;
  z-index: -2;
  opacity: 0;
  overflow: visible;
  padding-bottom: 20px;
  opacity: 0;
  filter: drop-shadow(0px 2px 5px #222);
}

.flag-wrapper {
  position: absolute;
  height: var(--flag-height);
  width: var(--flag-width);
  top: 0;
  z-index: -3;
  opacity: 0;
}

.flag-mask {
  width: 100%;
  height: var(--flag-height);
}

.flag {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.name-text-wrapper {
  position: absolute;
  top: var(--name-text-offset-y);
  height: var(--name-text-height);
  width: var(--name-text-width);
  line-height: var(--name-text-height);
  font-family: "Bebas Neue Bold", "Rounded Mplus Bold";
}

.games-text-wrapper {
  position: absolute;
  top: var(--games-text-offset-y);
  height: var(--games-text-height);
  width: var(--games-text-width);
  text-align: center;
  line-height: var(--games-text-height);
}

.games-text {
  color: white;
  font-size: 3.5rem;
  font-family: "Gilroy";
  font-weight: bold;
}

.team-text {
  color: gray;
}

.gamertag-text {
  color: white;
}

@keyframes main-panel-in {
  0% {
    opacity: 1;
    top: calc(var(--main-panel-height) * -1);
  }
  100% {
    opacity: 1;
    top: 0px
  }
}

@keyframes p1-name-in {
  0% {
    opacity: 1;
    left: 10%;
    clip-path: polygon(0 0, 15% 0, 15% 100%, 0 100%);
  }
  100% {
    opacity: 1;
    left: var(--name-panel-offset);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

@keyframes p2-name-in {
  0% {
    opacity: 1;
    right: 10%;
    clip-path: polygon(85% 0, 100% 0, 100% 100%, 85% 100%);
  }
  100% {
    opacity: 1;
    right: var(--name-panel-offset);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

@keyframes p1-flag-in {
  0% {
    opacity: 1;
    left: var(--flag-width);
  }
  100% {
    opacity: 1;
    left: var(--flag-offset);
  }
}

@keyframes p2-flag-in {
  0% {
    opacity: 1;
    right: var(--flag-width);
  }
  100% {
    opacity: 1;
    right: var(--flag-offset);
  }
}

</style>
