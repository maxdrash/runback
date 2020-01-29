import clone from "clone"
import { ReplicantBrowser } from "nodecg/types/browser"
import Vue from "vue"
import Vuex, { Store } from "vuex"

import { Player, Players, Scoreboard, Bracket } from "schemas"

Vue.use(Vuex)

// Replicants and their types
const reps: {
  players: ReplicantBrowser<Players>
  scoreboard: ReplicantBrowser<Scoreboard>
  bracket: ReplicantBrowser<Bracket>
  [k: string]: ReplicantBrowser<unknown>
} = {
  players: nodecg.Replicant("players"),
  scoreboard: nodecg.Replicant("scoreboard"),
  bracket: nodecg.Replicant("bracket"),
}

const defaultBracket: Bracket = {
  side: 1,
  progress: 1,
  finals: 1,
  customProgress: "",
  shouldOverrideProgress: false
}

const store = new Vuex.Store({
  state: {
    players: [] as Players,
    scoreboard: [] as Scoreboard,
    bracket: defaultBracket,
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
                                                  scoreboard: Scoreboard,
                                                  bracket: Bracket }>> {
  return NodeCG.waitForReplicants(
    ...Object.keys(reps).map((key) => reps[key]),
  ).then(() => store)
}
