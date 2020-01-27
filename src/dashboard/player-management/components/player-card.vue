<template>
  <div class="player-card">
    <v-card>

      <v-toolbar dense dark color="secondary">
        <v-toolbar-title>
          <div class="body-1 text-truncate">
            {{ displayName() }}
          </div>
        </v-toolbar-title>
      </v-toolbar>

      <v-row no-gutters align="end" justify="end">
        <v-col cols="10">

          <v-card-text>

            <v-row class="my-n3">
              <v-col cols="12">
                <div class="text-truncate">
                  {{ players[playerId].name }}
                </div>
              </v-col>
            </v-row>

            <v-row class="my-n3">
              <v-col cols="12">
                <div class="text-truncate">
                  {{ countryName() }}
                </div>
              </v-col>
            </v-row>

          </v-card-text>

        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="2" align="end" justify="end">

          <v-dialog v-model="dialog" persistent max-width="600px" @input="clearForm()">
            <template v-slot:activator="{ on }">
              <v-btn text icon v-on="on">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Edit player details</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form
                    ref="editForm"
                    v-model="valid"
                    >
                    <v-text-field
                      v-model="localPlayer.gamerTag"
                      :rules="gamerTagRules"
                      label="Gamertag*"
                      required
                      ></v-text-field>

                    <v-text-field
                      v-model="localPlayer.name"
                      :rules="nameRules"
                      label="Name*"
                      ></v-text-field>

                    <v-autocomplete
                      v-model="localPlayer.country"
                      :items="countries"
                      :rules="countryRules"
                      item-text="country"
                      item-value="abbreviation"
                      label="Country*"
                      required
                      ></v-autocomplete>

                    <v-text-field
                      v-model="localPlayer.team"
                      label="Team"
                      ></v-text-field>

                  <v-text-field
                    v-model="localPlayer.twitter"
                    label="Twitter"
                    ></v-text-field>

                  </v-form>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-dialog v-model="deleteDialog" persistent max-width="400px">
                  <template v-slot:activator="{ on }">
                    <div v-if="shouldDisplayDelete">
                      <v-tooltip
                        v-model="showTooltip"
                        right
                        >
                        <template v-slot:activator="{ on: tooltip }">
                          <div v-on="tooltip">
                            <v-btn
                              color="error darken-1"
                              v-on="on"
                              text
                              :disabled="shouldDisplayDelete"
                              >
                              Delete
                            </v-btn>
                          </div>
                        </template>
                        <span>Two players must exist</span>
                      </v-tooltip>
                    </div>
                    <div v-else>
                      <v-btn
                        color="error darken-1"
                        v-on="on"
                        text
                        :disabled="shouldDisplayDelete"
                        >
                        Delete
                      </v-btn>
                    </div>

                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Confirm deletion</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        Are you sure? Deleted players cannot be recovered.
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="deleteDialog = false">Cancel</v-btn>
                      <v-btn
                        :disabled="!valid"
                        color="error darken-1"
                        text
                        @click="confirmDeletePlayer()"
                        >
                        Delete
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

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

      </v-row>

    </v-card>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Vue, Component, Prop, Provide } from 'vue-property-decorator';
import { State, Mutation, Action } from 'vuex-class';

import { Player } from "schemas/player"
import { Players } from "schemas/players"
import { UpdatePlayer, DeletePlayer } from "../store"

import clone from "clone"
import COUNTRIES from "country-json/src/country-by-abbreviation.json"

@Component
export default class PlayerCard extends Vue {
  @Prop() playerId!: number
  @State("players") playersState!: Players
  @Mutation updatePlayer!: UpdatePlayer
  @Mutation deletePlayer!: DeletePlayer

  localPlayer!: Player
  valid: boolean = true
  dialog: boolean = false
  showTooltip: boolean = false
  deleteDialog: boolean = false
  key: number = 0

  readonly countries: Array<{country: string, abbreviation: string}> = COUNTRIES

  readonly gamerTagRules: Array<Function> = [
    (v: string) => !!v || 'Gamertag is required'
  ]

  readonly countryRules: Array<Function> = [
    (v: string) => !!v || 'Country is required'
  ]

  readonly nameRules: Array<Function> = [
    (v: string) => !!v || 'Name is required'
  ]

  created(): void {
    this.clearForm()
  }

  clearForm(): void {
    this.localPlayer = clone(this.players[this.playerId])
  }

  get shouldDisplayDelete() {
    let length = this.players.filter(i => i.isActive).length
    return length <= 2
  }

  get players(): Players {
    return this.playersState
  }

  saveDialog(): void {
    this.dialog = false
    this.updatePlayer(this.localPlayer)
  }

  countryName() {
    return this.countries.find(
      i => i.abbreviation === this.players[this.playerId].country)!.country
  }

  displayName() {
    const player = this.players[this.playerId]

    return player.team ? player.team + " | " + player.gamerTag : player.gamerTag
  }

  confirmDeletePlayer(): void {
    this.dialog = false
    this.deletePlayer(this.playerId)
  }
}

</script>

<style>
.no-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
