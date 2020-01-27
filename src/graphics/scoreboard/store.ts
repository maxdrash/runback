import clone from "clone"
import { ReplicantBrowser } from "nodecg/types/browser"
import Vue from "vue"
import Vuex, { Store } from "vuex"

import { Player, Players, Scoreboard } from "schemas"

Vue.use(Vuex)

// Replicants and their types
const reps: {
  players: ReplicantBrowser<Players>
  scoreboard: ReplicantBrowser<Scoreboard>
  [k: string]: ReplicantBrowser<unknown>
} = {
  players: nodecg.Replicant("players"),
  scoreboard: nodecg.Replicant("scoreboard"),
}

const store = new Vuex.Store({
  state: {
    players: [] as Players,
    scoreboard: [] as Scoreboard,
  },
  mutations: {
    setState(state, { name, val }): void {
      Vue.set(state, name, val)
    },
    /* Mutations to replicants end */
  },
})

Object.keys(reps).forEach((key) => {
  reps[key].on("change", (val) => {
    store.commit("setState", { name: key, val: clone(val) })
  })
})

export default async function (): Promise<Store<{ players: Players,
                                                  scoreboard: Scoreboard }>> {
  return NodeCG.waitForReplicants(
    ...Object.keys(reps).map((key) => reps[key]),
  ).then(() => store)
}
