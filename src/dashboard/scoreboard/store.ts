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
export type UpdateBracket = (bracket: Bracket) => void
export type UpdateScoreboard = (scoreboard: Scoreboard) => void

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
    updateBracket(state, bracket: Bracket): void {
      reps.bracket.value = clone(bracket)
    },

    setPlayerId(state, args: {playerIndex: number, playerId: number}): void {
      if (typeof reps.scoreboard.value !== 'undefined') {
        reps.scoreboard.value[args.playerIndex].playerId = args.playerId
      }
    },

    setGames(state, args: {playerIndex: number, games: number}): void {
      if (typeof reps.scoreboard.value !== 'undefined') {
        reps.scoreboard.value[args.playerIndex].games = args.games
      }
    },

    setGamerTagOverride(state, args: {playerIndex: number, gamerTagOverride: string}): void {
      if (typeof reps.scoreboard.value !== 'undefined') {
        reps.scoreboard.value[args.playerIndex].gamerTagOverride = args.gamerTagOverride
      }
    },

    setTeamOverride(state, args: {playerIndex: number, teamOverride: string}): void {
      if (typeof reps.scoreboard.value !== 'undefined') {
        reps.scoreboard.value[args.playerIndex].teamOverride = args.teamOverride
      }
    },

    setCountryOverride(state, args: {playerIndex: number, countryOverride: string}): void {
      if (typeof reps.scoreboard.value !== 'undefined') {
        reps.scoreboard.value[args.playerIndex].countryOverride = args.countryOverride
      }
    },

    setShouldOverride(state, args: {playerIndex: number, shouldOverride: boolean}): void {
      if (typeof reps.scoreboard.value !== 'undefined') {
        reps.scoreboard.value[args.playerIndex].shouldOverride = args.shouldOverride
      }
    },

    setSide(state, side: number) {
      if (typeof reps.bracket.value !== 'undefined') {
        reps.bracket.value.side = side
      }
    },

    setProgress(state, progress: number) {
      if (typeof reps.bracket.value !== 'undefined') {
        reps.bracket.value.progress = progress
      }
    },

    setFinals(state, finals: number) {
      if (typeof reps.bracket.value !== 'undefined') {
        reps.bracket.value.finals = finals
      }
    },

    setCustomProgress(state, customProgress: string) {
      if (typeof reps.bracket.value !== 'undefined') {
        reps.bracket.value.customProgress = customProgress
      }
    },

    setShouldOverrideProgress(state, shouldOverrideProgress: boolean) {
      if (typeof reps.bracket.value !== 'undefined') {
        reps.bracket.value.shouldOverrideProgress = shouldOverrideProgress
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
