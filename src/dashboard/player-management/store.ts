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
export type ImportPlayers = (importedPlayers: Array<Player>) => void
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
      let players = reps.players.value

      if (typeof players !== "undefined") {
        player.id = players.length
        players.push(player)
      }
    },
    importPlayers(state, importedPlayers: Array<Player>): void {
      let players = reps.players.value

      if (typeof players !== "undefined") {
        let id = players.length

        importedPlayers.forEach((player: Player) => {
          player.id = id
          players!.push(player)
          ++id
        })
      }
    },
    updatePlayer(state, player: Player): void {
      let players = reps.players.value

      if (typeof players !== "undefined") {
        players[player.id] = player
      }
    },
    deletePlayer(state, playerId: number): void {
      let players = reps.players.value
      let scoreboard = reps.scoreboard.value

      if (typeof players !== "undefined" && typeof scoreboard !== "undefined") {
        let numPlayers = players.filter(i => i.isActive).length

        if (numPlayers === 2) {
          throw "At least two players must exist"
        }

        // Reset a deleted player if they are currently selected on the scoreboard.
        for (let i = 0; i < scoreboard.length; ++i) {
          if (scoreboard[i].playerId === playerId) {
            let defaultId = players.find(i => i.isActive && i.id !== playerId)!.id
            scoreboard[i].playerId = defaultId
          }
        }

        players[playerId].isActive = false
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
