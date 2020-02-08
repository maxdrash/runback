<template>
  <div class="player">

    <v-row align="center" justify="center">
      <div class="headline justify-center black--text">
        {{ displayName(scoreboard[playerIndex].playerId) }}
      </div>
    </v-row>

    <v-row align="center" justify="center">

      <v-col cols="2" class="d-flex justify-center">
        <v-btn@click="updateGames(false)">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4">
        <div class="display-3 text-center text-no-wrap black--text px-2">
          {{ scoreboard[playerIndex].games }}
        </div>
      </v-col>
      <v-col cols="2" class="d-flex justify-center">
        <v-btn @click="updateGames(true)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>

    </v-row>

    <v-container>
      <v-autocomplete
        v-model="playerId"
        :items="filterPlayers"
        item-text="gamerTag"
        item-value="id"
        label="Player"
        outlined
        >
        <template v-slot:selection="{ item, index }">
          {{ displayName(item.id) }}
        </template>

        <template v-slot:item="{ item, index }">
          {{ displayName(item.id) }}
        </template>

      </v-autocomplete>

      <v-row align="center" justify="center" class="my-n8">

        <v-col cols="auto" align="center">
          <v-dialog v-model="dialog" persistent max-width="600px" @input="clearForm()">
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
                      v-model="localScore.gamerTagOverride"
                      :rules="gamerTagRules"
                      label="Gamertag*"
                      required
                      ></v-text-field>

                    <v-autocomplete
                      v-model="localScore.countryOverride"
                      :items="countries"
                      :rules="countryRules"
                      item-text="country"
                      item-value="abbreviation"
                      label="Country*"
                      required
                      ></v-autocomplete>

                    <v-text-field
                      v-model="localScore.teamOverride"
                      label="Team"
                      ></v-text-field>
                    </v-form>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="blue darken-1"
                    @click="dialog = false"
                    >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    :disabled="!valid"
                    color="blue darken-1"
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
              v-model="localScore.shouldOverride"
              @change="setShouldOverride({playerIndex: playerIndex,
                       shouldOverride: localScore.shouldOverride})"
              ></v-checkbox>
          </v-col>
        </v-row>

    </v-container>
  </div>
</template>

<script lang="ts">
import "reflect-metadata"
import { Vue, Component, Prop, Provide, Ref } from "vue-property-decorator"
import { State, Mutation, Action } from 'vuex-class';

import { Player } from "schemas/player"
import { Players } from "schemas/players"
import { Scoreboard } from "schemas/scoreboard"
import { Score } from "schemas/score"

import {
  SetPlayerId,
  SetGames,
  SetGamerTagOverride,
  SetTeamOverride,
  SetCountryOverride,
  SetShouldOverride
} from "../store"

import clone from "clone"

import COUNTRIES from "country-json/src/country-by-abbreviation.json"

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

@Component
export default class ScoreboardColumn extends Vue {
  @State("players") playersState!: Players
  @State("scoreboard") scoreboardState!: Scoreboard
  @Mutation setPlayerId!: SetPlayerId
  @Mutation setGames!: SetGames
  @Mutation setGamerTagOverride!: SetGamerTagOverride
  @Mutation setTeamOverride!: SetTeamOverride
  @Mutation setCountryOverride!: SetCountryOverride
  @Mutation setShouldOverride!: SetShouldOverride
  @Prop() playerIndex!: number

  readonly MIN: number = 0
  readonly MAX: number = 99

  valid: boolean = true
  dialog: boolean = false
  localScore!: Score

  readonly countries: Array<{country: string, abbreviation: string}> = COUNTRIES

  get playerId(): number {
    return this.scoreboard[this.playerIndex].playerId
  }

  set playerId(playerId: number) {
    this.setPlayerId({playerIndex: this.playerIndex, playerId: playerId})
  }

  gamerTagRules: Array<Function> = [
    (v: string) => !!v || 'Gamertag is required'
  ]

  countryRules: Array<Function> = [
    (v: string) => !!v || 'Country is required'
  ]

  created(): void {
    this.clearForm()
  }

  clearForm(): void {
    this.localScore = clone(this.scoreboard[this.playerIndex])
  }

  get filterPlayers(): Players {
    function displayName(p: Player): string {
      return p.team ? p.team + " | " + p.gamerTag : p.gamerTag
    }

    return this.players.filter(i => i.isActive ).sort((a, b) =>
      displayName(a).localeCompare(displayName(b))
    )
  }

  get players(): Players {
    return this.playersState
  }

  get scoreboard(): Scoreboard {
    return this.scoreboardState
  }

  displayName(playerId: number) {
    const player = this.players[playerId]

    return player.team ? player.team + " | " + player.gamerTag : player.gamerTag
  }

  updateGames(wasPlus: boolean) {
    this.localScore.games =
      clamp(this.scoreboard[this.playerIndex].games + (wasPlus ? 1 : -1), this.MIN, this.MAX)

    this.setGames({playerIndex: this.playerIndex,
      games: this.localScore.games
    })
  }

  get validPlayers() {
    return this.players.filter(i => i.isActive)
  }

  saveDialog(): void {
    this.dialog = false

    this.setGamerTagOverride({
      playerIndex: this.playerIndex,
      gamerTagOverride: this.localScore.gamerTagOverride
    })

    this.setTeamOverride({
      playerIndex: this.playerIndex,
      teamOverride: this.localScore.teamOverride
    })

    this.setCountryOverride({
      playerIndex: this.playerIndex,
      countryOverride: this.localScore.countryOverride
    })
  }
}
</script>
