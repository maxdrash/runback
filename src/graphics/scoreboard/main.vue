<template>
  <div class="base">
    <link rel="stylesheet" type="text/css" href="">

    <div class="flex">
      <img src="./img/main.svg" class="main main-ani">
      <img src="./img/back.svg" class="back">
    </div>

    <div class="flex">
      <div class="name-wrapper name-wrapper-p1">
        <img src="./img/name1.svg" class="name name-p1 name-ani-p1">
      </div>
    </div>

    <div class="flex">
      <div class="name-wrapper name-wrapper-p2">
        <img src="./img/name2.svg" class="name name-p2 name-ani-p2">
      </div>
    </div>

    <div class="flex">
      <div
        class="flag-wrapper flag-wrapper-p1 flag-p1"
        :class="[player1CountryUpdating ? 'flag-update-p1' : '', shouldHideFlag ? 'flag-hidden': '',
                 shouldFadeInFlag ? 'flag-initial-wipe-p1' : '']"
        >
        <div class="flag-mask flag-mask-p1">
          <img :src="flagPath(localPlayer1Country)" class="flag">
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="flag-wrapper flag-wrapper-p2 flag-p2"
        :class="[player2CountryUpdating ? 'flag-update-p2' : '', shouldHideFlag ? 'flag-hidden': '',
                 shouldFadeInFlag ? 'flag-initial-wipe-p2' : '']"
        >
        <div class="flag-mask flag-mask-p2">
          <img :src="flagPath(localPlayer2Country)" class="flag">
        </div>
      </div>
    </div>

    <div class="flex">
      <div
        class="name-text name-text-p1"
        :class="[player1NameUpdating ? 'text-update-ani' : '', shouldHide ? 'hidden': '',
                 shouldFadeIn ? 'initial-fade-in' : '']"
        >
        <fit-text
          unit="rem"
          :min="1"
          :max="2"
          >
          {{ localPlayer1Name }}
        </fit-text>
      </div>
    </div>

    <div class="flex">
      <div class="name-text name-text-p2"
        :class="[player2NameUpdating ? 'text-update-ani' : '', shouldHide ? 'hidden': '',
                 shouldFadeIn ? 'initial-fade-in' : '']"
        >
        <fit-text
          unit="rem"
          :min="1"
          :max="2"
          >
          {{ localPlayer2Name }}
        </fit-text>
      </div>
    </div>

    <div class="flex">
      <span class="score-text score-text-p1"
        :class="[player1GamesUpdating ? 'text-update-ani' : '', shouldHide ? 'hidden': '',
                 shouldFadeIn ? 'initial-fade-in' : '']"
        >
        {{ localPlayer1Games }}
      </span>
    </div>

    <div class="flex">
      <span class="score-text score-text-p2"
        :class="[player2GamesUpdating ? 'text-update-ani' : '', shouldHide ? 'hidden': '',
                 shouldFadeIn ? 'initial-fade-in' : '']"
        >
        {{ localPlayer2Games }}
      </span>
    </div>

    <div class="flex">
      <div class="progress-text"
        :class="[progressUpdating ? 'text-update-ani' : '', shouldHide ? 'hidden': '',
                 shouldFadeIn ? 'initial-fade-in' : '']"
        >
        <fit-text
          unit="rem"
          :min="0.5"
          :max="1.5"
          >
          {{ localProgress }}
        </fit-text>

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

  shouldFadeIn: boolean = true
  shouldFadeInFlag: boolean = true
  shouldHide: boolean = true
  shouldHideFlag: boolean = true

  localPlayer1Name: string = ""
  localPlayer2Name: string = ""
  localPlayer1Games: number = 0
  localPlayer2Games: number = 0
  localPlayer1Country: string = ""
  localPlayer2Country: string = ""
  localProgress: string = ""

  player1NameUpdating: boolean = false
  player2NameUpdating: boolean = false
  player1GamesUpdating: boolean = false
  player2GamesUpdating: boolean = false
  player1CountryUpdating: boolean = false
  player2CountryUpdating: boolean = false
  progressUpdating: boolean = false

  readonly progressList: Array<{text: string, value: number}> = BRACKET_RULES.progressList
  readonly sideList: Array<{text: string, value: number}> = BRACKET_RULES.sideList
  readonly finalsList: Array<{text: string, value: number}> = BRACKET_RULES.finalsList

  created(): void {
    this.localPlayer1Name = this.player1Name
    this.localPlayer2Name = this.player2Name
    this.localPlayer1Games = this.player1Games
    this.localPlayer2Games = this.player2Games
    this.localPlayer1Country = this.player1Country
    this.localPlayer2Country = this.player2Country
    this.localProgress = this.progress

    setTimeout(() => {
      this.shouldHide = false
      this.shouldHideFlag = false
      this.shouldFadeIn = false
      this.shouldFadeInFlag = false
    }, 3000)
  }

  playerName(playerIndex: number): string {
    return this.scoreboard[playerIndex].shouldOverride ?
      this.scoreboard[playerIndex].gamerTagOverride :
      this.players[this.scoreboard[playerIndex].playerId].gamerTag
  }

  get player1Name(): string {
    return this.playerName(0)
  }

  get player2Name(): string {
    return this.playerName(1)
  }

  get player1Games(): number {
    return this.scoreboard[0].games
  }

  get player2Games(): number {
    return this.scoreboard[1].games
  }

  @Watch("player1Name")
  player1NameChanged(newVal: string, oldVal: string): void {
    this.player1NameUpdating = true

    setTimeout(() => {
      this.localPlayer1Name = newVal
    }, 500)

    setTimeout(() => {
      this.player1NameUpdating = false
    }, 1000)
  }

  @Watch("player2Name")
  player2NameChanged(newVal: string, oldVal: string): void {
    this.player2NameUpdating = true

    setTimeout(() => {
      this.localPlayer2Name = newVal
    }, 500)

    setTimeout(() => {
      this.player2NameUpdating = false
    }, 1000)
  }

  @Watch("player1Games")
  player1GamesChanged(newVal: number, oldVal: number): void {
    this.player1GamesUpdating = true

    setTimeout(() => {
      this.localPlayer1Games = newVal
    }, 500)

    setTimeout(() => {
      this.player1GamesUpdating = false
    }, 1000)
  }

  @Watch("player2Games")
  player2GamesChanged(newVal: number, oldVal: number): void {
    this.player2GamesUpdating = true

    setTimeout(() => {
      this.localPlayer2Games = newVal
    }, 500)

    setTimeout(() => {
      this.player2GamesUpdating = false
    }, 1000)
  }

  @Watch("progress")
  progressChanged(newVal: string, oldVal: string): void {
    this.progressUpdating = true

    setTimeout(() => {
      this.localProgress = newVal
    }, 500)

    setTimeout(() => {
      this.progressUpdating = false
    }, 1000)
  }

  playerCountry(playerIndex: number): string {
    return this.scoreboard[playerIndex].shouldOverride ?
      this.scoreboard[playerIndex].countryOverride :
      this.players[this.scoreboard[playerIndex].playerId].country
  }

  @Watch("player1Country")
  player1CountryChanged(newVal: string, oldVal: string): void {
    this.player1CountryUpdating = true

    setTimeout(() => {
      this.localPlayer1Country = newVal
    }, 500)

    setTimeout(() => {
      this.player1CountryUpdating = false
    }, 1500)
  }

  @Watch("player2Country")
  player2CountryChanged(newVal: string, oldVal: string): void {
    this.player2CountryUpdating = true

    setTimeout(() => {
      this.localPlayer2Country = newVal
    }, 500)

    setTimeout(() => {
      this.player2CountryUpdating = false
    }, 1500)
  }

  get player1Country(): string {
   return this.playerCountry(0)
  }

  get player2Country(): string {
   return this.playerCountry(1)
  }

  get progress(): string {
    return this.bracket.shouldOverrideProgress ?
      this.bracket.customProgress :
      this.progressList[this.bracket.progress - 1].text
  }

  get players(): Players {
    return this.playersState
  }

  get scoreboard(): Scoreboard {
    return this.scoreboardState
  }

  get bracket(): Bracket {
    return this.bracketState
  }

  flagPath(country: string): string {
    return require("@/../node_modules/region-flags/svg/" +
      country.toUpperCase() + ".svg")
  }
}
</script>

<style>

.name-text {
  position: absolute;
  top: 0%;
  height: 50px;
  width: 375px;
  color: white;
  line-height: 50px;
  text-align: center;
}

span {
  font-family: "Roboto";
  font-weight: 300;
}

.text-update-ani {
  opacity: 1;
  animation: fade-out-in 1s linear forwards !important;
}

.name-text-p1 {
  padding-right: 825px;
}

.name-text-p2 {
  padding-left: 800px;
}

.score-text {
  position: absolute;
  top: 0%;
  height: 50px;
  width: 50px;
  font-size: 3rem;
  color: white;
  line-height: 50px;
  text-align: center;
  padding-top: 5px;
}

.score-text-p1 {
  padding-right: 330px;
}

.score-text-p2 {
  padding-left: 330px;
}

.progress-text {
  position: absolute;
  top: 0%;
  height: 44px;
  width: 260px;
  color: white;
  line-height: 44px;
  text-align: center;
}

.main {
  position: absolute;
  top: 0%;
  height: 60px;
  z-index: 0;
  filter: drop-shadow(0px 5px 5px #222);
}

.name {
  height: 50px;
  z-index: -1;
  clip-path: polygon(100% 0%, 100% 0, 100% 100%, 100% 100%);
}

.name-wrapper {
  position: absolute;
  top: 0%;
  filter: drop-shadow(0px 2px 5px #222);
  z-index: -1;
}

.name-wrapper-p1 {
  padding-right: 850px;
}

.name-wrapper-p2 {
  padding-left: 850px;
}

.flex {
  display: flex;
  justify-content: center;
}

.back {
  position: absolute;
  top: 0%;
  height: 50px;
  z-index: -2;
  animation: slide-down 0.8s ease-in-out forwards;
  transform:translate3d(0,0,0);
}

.flag-mask {
  width: 100%;
  height: 50px;
}

.flag-wrapper {
  width: 120px;
  height: 70px;
  position: absolute;
  top: 0%;
  padding: 10px;
  margin: -10px;
  filter: drop-shadow(0px 2px 5px #222);
}

.flag {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.flag-mask-p1 {
  clip-path: polygon(0 0, 75% 0, 100% 100%, 25% 100%);
}

.flag-mask-p2 {
  clip-path: polygon(25% 0, 100% 0, 75% 100%, 0 100%);
}

.flag-initial-wipe-p1 {
  animation: wipe-left 1.5s forwards;
  transform:translate3d(0,0,0);
  animation-delay: 1.35s;
}

.flag-initial-wipe-p2 {
  animation: wipe-right 1.5s forwards;
  transform:translate3d(0,0,0);
  animation-delay: 1.35s;
}

.flag-hidden {
  clip-path: polygon(100% 0%, 100% 0, 100% 100%, 100% 100%);
}

.flag-update-p1 {
  animation: wipe-left-in-out 1s cubic-bezier(1, 0, 0, 1) forwards;
}

.flag-update-p2 {
  animation: wipe-right-in-out 1s cubic-bezier(1, 0, 0, 1) forwards;
}

.flag-p1 {
  padding-right: 1350px;
}

.flag-p2 {
  padding-left: 1350px;
}

.main-ani {
  animation: slide-down 1s ease-in-out forwards;
  transform:translate3d(0,0,0);
}

.name-ani-p1 {
  animation: wipe-left 1s ease-in-out forwards;
  transform:translate3d(0,0,0);
  animation-delay: 1.5s;
}

.name-ani-p2 {
  animation: wipe-right 1s ease-in-out forwards;
  transform:translate3d(0,0,0);
  animation-delay: 1.5s;
}

.hidden {
  opacity: 0;
}

.initial-fade-in {
  animation: fade-in 0.5s linear forwards;
  animation-delay: 2.25s;
}

@keyframes slide-down {
  0% { top: -30% }
  100% { top: 0% }
}

@keyframes wipe-left {
  0% { clip-path: polygon(100% 0%, 100% 0, 100% 100%, 100% 100%) }
  100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) }
}


/* clip-path: polygon(0 0, 75% 0, 100% 100%, 25% 100%); */

@keyframes wipe-left-in-out {
  0% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) }
  50% { clip-path: polygon(100% 0%, 100% 0, 100% 100%, 100% 100%) }
  100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) }
}

@keyframes wipe-right-in-out {
  0% { clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%) }
  50% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%) }
  100% { clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%) }
}

@keyframes wipe-right {
  0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%) }
  100% { clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%) }
}

@keyframes fade-in {
  0% { opacity: 0 }
  100% { opacity: 1 }
}

@keyframes fade-out-in {
  0% { opacity: 1 }
  35% { opacity: 0 }
  65% { opacity: 0 }
  100% { opacity: 1 }
}

</style>
