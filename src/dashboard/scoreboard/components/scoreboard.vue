<template>
  <div class="scoreboard-container">
    <v-container>
      <v-row>
        <v-col cols="6">
          <scoreboard-column :playerIndex="0"></scoreboard-column>
        </v-col>
        <v-col cols="6">
          <scoreboard-column :playerIndex="1"></scoreboard-column>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="my-2 mt-n4">
      <v-divider></v-divider>

      <v-row align="center" justify="center" class="mt-8">
        <v-btn @click="swapPlayers()" color="primary" class="mx-2">
          <v-icon left>mdi-swap-horizontal</v-icon>
          Swap
        </v-btn>
        <v-btn @click="resetGames()" color="primary" class="mx-2">
          <v-icon left>mdi-close</v-icon>
          Reset
        </v-btn>
      </v-row>
    </v-container>

  </div>
</template>

<script lang="ts">
import "reflect-metadata"
import { Vue, Component, Prop, Provide } from "vue-property-decorator"
import { State, Mutation, Action } from 'vuex-class';

import { Scoreboard as ScoreboardSchema } from "schemas/scoreboard"
import { SetPlayerId, SetGames } from "../store"

@Component
export default class Scoreboard extends Vue {
  @State("scoreboard") scoreboardState!: ScoreboardSchema
  @Mutation setPlayerId!: SetPlayerId
  @Mutation setGames!: SetGames

  get scoreboard(): ScoreboardSchema {
    return this.scoreboardState
  }

  resetGames(): void {
    this.setGames({playerIndex: 0, games: 0})
    this.setGames({playerIndex: 1, games: 0})
  }

  swapPlayers(): void {
    let tmp = this.scoreboard[1].playerId
    this.setPlayerId({playerIndex: 1, playerId: this.scoreboard[0].playerId})
    this.setPlayerId({playerIndex: 0, playerId: tmp})
  }
}
</script>
