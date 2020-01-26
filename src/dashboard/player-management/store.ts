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

// Types for mutations below
export type CreatePlayer = (player: Player) => void
export type UpdatePlayer = (player: Player) => void
export type DeletePlayer = (playerId: number) => void

const store = new Vuex.Store({
  state: {
    players: [] as Players,
    scoreboard: [] as Scoreboard,
  },
  mutations: {
    setState(state, { name, val }): void {
      Vue.set(state, name, val)
    },
    /* Mutations to replicants start */
    createPlayer(state, player: Player): void {
      if (typeof reps.players.value !== 'undefined') {
        player.id = reps.players.value.length

        reps.players.value.push(player)
      }
    },
    updatePlayer(state, player: Player): void {
      if (typeof reps.players.value !== 'undefined') {
        reps.players.value[player.id] = player
      }
    },
    deletePlayer(state, playerId: number): void {
      if (typeof reps.players.value !== 'undefined') {
        if (reps.players.value.length === 2) {
          throw "At least two players must exist"
        }

        // Remove the player and reindex the players array.
        let tmp = clone(reps.players.value)
        tmp.splice(playerId, 1)

        for (let i = 0; i < tmp.length; ++i) {
          tmp[i].id = i
        }

        // Reset a selected player if it was deleted.
        if (typeof reps.scoreboard.value !== 'undefined') {
          for (let i = 0; i < reps.scoreboard.value.length; ++i) {
            if (reps.scoreboard.value[i].playerId === playerId) {
              reps.scoreboard.value[i].playerId = 0
            }
          }
        }

        reps.players.value = tmp
      }
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
