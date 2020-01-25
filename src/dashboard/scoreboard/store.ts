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
  shouldOverride: false
}

// Types for mutations below
export type UpdateBracket = (bracket: Bracket) => void
export type UpdateScoreboard = (scoreboard: Scoreboard) => void

const store = new Vuex.Store({
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
    updateScoreboard(state, scoreboard: Scoreboard): void {
      reps.scoreboard.value = clone(scoreboard)
    },
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
