import clone from "clone"
import { ReplicantBrowser } from "nodecg/types/browser"
import Vue from "vue"
import Vuex, { Store } from "vuex"

import { Players } from "schemas"

Vue.use(Vuex)

// Replicants and their types
const reps: {
  players: ReplicantBrowser<Players>
  [k: string]: ReplicantBrowser<unknown>
} = {
  players: nodecg.Replicant("players"),
}

// Types for mutations below
export type UpdatePlayers = (players: Players) => void

const store = new Vuex.Store({
  state: {
    players: [] as Players,
  },
  mutations: {
    setState(state, { name, val }): void {
      Vue.set(state, name, val)
    },
    /* Mutations to replicants start */
    updatePlayers(state, players: Players): void {
      reps.players.value = clone(players)
    },
    /* Mutations to replicants end */
  },
})

Object.keys(reps).forEach((key) => {
  reps[key].on("change", (val) => {
    store.commit("setState", { name: key, val: clone(val) })
  })
})

export default async function (): Promise<Store<{ players: Players }>> {
  return NodeCG.waitForReplicants(
    ...Object.keys(reps).map((key) => reps[key]),
  ).then(() => store)
}
