import clone from "clone"
import { ReplicantBrowser } from "nodecg/types/browser"
import Vue from "vue"
import Vuex, { Store } from "vuex"

import { Bracket, Players, Scoreboard } from "schemas"

Vue.use(Vuex)

// Replicants and their types
const reps: {
  bracket: ReplicantBrowser<Bracket>
  players: ReplicantBrowser<Players>
  scoreboard: ReplicantBrowser<Scoreboard>
  [k: string]: ReplicantBrowser<unknown>
} = {
  bracket: nodecg.Replicant("bracket"),
  players: nodecg.Replicant("players"),
  scoreboard: nodecg.Replicant("scoreboard"),
}

const defaultBracket: Bracket = {
  side: 1,
  progress: 1,
  finals: 1,
  customProgress: "",
  shouldOverrideProgress: false
}

// Types for mutations below
export type SetPlayerId = (args: {playerIndex: number, playerId: number}) => void
export type SetGames = (args: {playerIndex: number, games: number}) => void
export type SetGamerTagOverride = (args: {playerIndex: number, gamerTagOverride: string}) => void
export type SetTeamOverride = (args: {playerIndex: number, teamOverride: string}) => void
export type SetCountryOverride = (args: {playerIndex: number, countryOverride: string}) => void
export type SetShouldOverride = (args: {playerIndex: number, shouldOverride: boolean}) => void

export type SetSide = (side: number) => void
export type SetProgress = (progress: number) => void
export type SetFinals = (finals: number) => void
export type SetCustomProgress = (customProgress: string) => void
export type SetShouldOverrideProgress = (shouldOverrideProgress: boolean) => void

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    bracket: defaultBracket,
    players: [] as Players,
    scoreboard: [] as Scoreboard
  },
  mutations: {
    setState(state, { name, val }): void {
      Vue.set(state, name, val)
    },
    /* Mutations to replicants start */
    setPlayerId(state, args: {playerIndex: number, playerId: number}): void {
      let scoreboard = reps.scoreboard.value

      if (typeof scoreboard !== "undefined") {
        scoreboard[args.playerIndex].playerId = args.playerId
      }
    },

    setGames(state, args: {playerIndex: number, games: number}): void {
      let scoreboard = reps.scoreboard.value

      if (typeof scoreboard !== "undefined") {
        scoreboard[args.playerIndex].games = args.games
      }
    },

    setGamerTagOverride(state, args: {playerIndex: number, gamerTagOverride: string}): void {
      let scoreboard = reps.scoreboard.value

      if (typeof scoreboard !== "undefined") {
        scoreboard[args.playerIndex].gamerTagOverride = args.gamerTagOverride
      }
    },

    setTeamOverride(state, args: {playerIndex: number, teamOverride: string}): void {
      let scoreboard = reps.scoreboard.value

      if (typeof scoreboard !== "undefined") {
        scoreboard[args.playerIndex].teamOverride = args.teamOverride
      }
    },

    setCountryOverride(state, args: {playerIndex: number, countryOverride: string}): void {
      let scoreboard = reps.scoreboard.value

      if (typeof scoreboard !== "undefined") {
        scoreboard[args.playerIndex].countryOverride = args.countryOverride
      }
    },

    setShouldOverride(state, args: {playerIndex: number, shouldOverride: boolean}): void {
      let scoreboard = reps.scoreboard.value

      if (typeof scoreboard !== "undefined") {
        scoreboard[args.playerIndex].shouldOverride = args.shouldOverride
      }
    },

    setSide(state, side: number) {
      let bracket = reps.bracket.value

      if (typeof bracket !== "undefined") {
        bracket.side = side
      }
    },

    setProgress(state, progress: number) {
      let bracket = reps.bracket.value

      if (typeof bracket !== "undefined") {
        bracket.progress = progress
      }
    },

    setFinals(state, finals: number) {
      let bracket = reps.bracket.value

      if (typeof bracket !== "undefined") {
        bracket.finals = finals
      }
    },

    setCustomProgress(state, customProgress: string) {
      let bracket = reps.bracket.value

      if (typeof bracket !== "undefined") {
        bracket.customProgress = customProgress
      }
    },

    setShouldOverrideProgress(state, shouldOverrideProgress: boolean) {
      let bracket = reps.bracket.value

      if (typeof bracket !== "undefined") {
        bracket.shouldOverrideProgress = shouldOverrideProgress
      }
    }
    /* Mutations to replicants end */
  },
})

Object.keys(reps).forEach((key) => {
  reps[key].on("change", (val) => {
    store.commit("setState", { name: key, val: clone(val) })
  })
})

export default async function (): Promise<Store<{ bracket: Bracket,
  players: Players,
  scoreboard: Scoreboard }>> {
    return NodeCG.waitForReplicants(
      ...Object.keys(reps).map((key) => reps[key]),
    ).then(() => store)
  }
