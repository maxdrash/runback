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
        <v-btn @click="resetScore()" color="primary" class="mx-2">
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
import { UpdateScoreboard } from "../store"

@Component
export default class Scoreboard extends Vue {
  @State("scoreboard") scoreboardState!: ScoreboardSchema
  @Mutation updateScoreboard!: UpdateScoreboard

  resetScore(): void {
    this.scoreboardState[0].score = 0
    this.scoreboardState[1].score = 0
    this.updateScoreboard(this.scoreboardState)
  }

  swapPlayers(): void {
    [this.scoreboardState[0].id, this.scoreboardState[1].id] =
      [this.scoreboardState[1].id, this.scoreboardState[0].id]

    this.updateScoreboard(this.scoreboardState)
  }
}
</script>
