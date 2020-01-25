<template>
  <div class="player">

    <v-row align="center" justify="center">
      <div class="headline justify-center black--text">
        {{ displayName() }}
      </div>
    </v-row>

    <v-row align="center" justify="center">

      <v-col cols="2" class="d-flex justify-center">
        <v-btn@click="updateScore(false)">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4">
        <div class="display-3 text-center text-no-wrap black--text px-2">
          {{ scoreboardState[playerIndex].score }}
        </div>
      </v-col>
      <v-col cols="2" class="d-flex justify-center">
        <v-btn @click="updateScore(true)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>

    </v-row>

    <v-container>
      <v-autocomplete
        v-model="scoreboardState[playerIndex].id"
        :items="playersState"
        item-text="gamerTag"
        item-value="id"
        label="Player"
        outlined
        @change="updateScoreboard(scoreboardState)"
        >
        <template v-slot:selection="{ item, index }">
          {{ item.team ? item.team + " | " : "" }} {{ item.gamerTag }}
        </template>

        <template v-slot:item="{ item, index }">
          {{ item.team ? item.team + " | " : "" }} {{ item.gamerTag }}
        </template>

      </v-autocomplete>

      <v-row align="center" justify="center" class="my-n8">

        <v-col cols="auto" align="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on">Override</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Override player details</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form
                    ref="form"
                    v-model="valid"
                    >
                    <v-text-field
                      v-model="scoreboardState[playerIndex].gamerTagOverride"
                      :rules="gamerTagRules"
                      label="Gamertag*"
                      required
                      ></v-text-field>

                    <v-text-field
                      v-model="scoreboardState[playerIndex].teamOverride"
                      label="Team"
                      ></v-text-field>

                    <v-autocomplete
                      v-model="scoreboardState[playerIndex].countryOverride"
                      :items="countries"
                      :rules="countryRules"
                      item-text="country"
                      item-value="abbreviation"
                      label="Country*"
                      required
                      ></v-autocomplete>
                    </v-form>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                  <v-btn
                    :disabled="!valid"
                    color="blue darken-1"
                    text
                    @click="saveDialog()">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

          <v-col cols="auto" align="center">
            <v-checkbox
              class="mt-5 ml-n4"
              v-model="scoreboardState[playerIndex].shouldOverride"
              @change="updateScoreboard(scoreboardState)"
              ></v-checkbox>
          </v-col>
        </v-row>

    </v-container>
  </div>
</template>

<script lang="ts">
import "reflect-metadata"
import { Vue, Component, Prop, Provide } from "vue-property-decorator"
import { State, Mutation, Action } from 'vuex-class';

import { Players } from "schemas/players"
import { Scoreboard } from "schemas/scoreboard"
import { UpdateScoreboard } from "../store"

import COUNTRIES from "country-json/src/country-by-abbreviation.json"

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

@Component
export default class ScoreboardColumn extends Vue {
  @State("players") playersState!: Players
  @State("scoreboard") scoreboardState!: Scoreboard
  @Mutation updateScoreboard!: UpdateScoreboard
  @Prop() playerIndex!: number

  readonly MIN: number = 0
  readonly MAX: number = 99

  valid: boolean = true
  dialog: boolean = false

  displayName() {
    let player = this.playersState.find(e =>
      e.id === this.scoreboardState[this.playerIndex].id
    )!

    return player.team ? player.team + " | " + player.name : player.name
  }

  countries: Array<{name: string, abbreviation: string}> = COUNTRIES

  gamerTagRules: Array<Function> = [
    (v: string) => !!v || 'Gamertag is required'
  ]

  countryRules: Array<Function> = [
    (v: string) => !!v || 'Country is required'
  ]

  updateScore(wasPlus: boolean) {
    this.scoreboardState[this.playerIndex].score =
      clamp(this.scoreboardState[this.playerIndex].score + (wasPlus ? 1 : -1), this.MIN, this.MAX)
    this.updateScoreboard(this.scoreboardState)
  }

  saveDialog(): void {
    this.dialog = false
    this.updateScoreboard(this.scoreboardState)
  }
}
</script>
