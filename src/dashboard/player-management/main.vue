<template>
  <v-app>
    <v-content>
      <v-row>
        <v-col cols="12">
          <panel title="Player Management" icon="account-edit" :addCardText="false">
          <v-toolbar>

            <v-row align="center">
              <v-col cols="12" :sm="6" :md="3">
                <v-text-field
                  v-model="search"
                  hide-details
                  prepend-icon="mdi-magnify"
                  single-line
                  placeholder="Search"
                  ></v-text-field>
              </v-col>

            </v-row>

            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in dropdownItems"
                  :key="index"
                  @click="item.event"
                  >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <input v-show="false" ref="inputUpload" type="file" accept="application/json"
              @change="importPlayersCallback($event.target.files[0])">

            <v-dialog v-model="registerDialog" persistent max-width="600px" @input="clearForm()">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Register new player</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form
                      ref="form"
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

                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  @click="registerDialog = false"
                  text
                  >
                  Cancel
                </v-btn>
                <v-btn
                  :disabled="!valid"
                  color="blue darken-1"
                  text
                  @click="submitRegisterPlayer()"
                  >
                  Register
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          </v-toolbar>
          <v-card-text>
            <v-row>

              <v-col cols="6" :sm="4" :md="3" v-for="player in filterPlayers">
                <player-card :playerId="player.id"></player-card>
              </v-col>

            </v-row>
          </v-card-text>
          </panel>
        </v-col>
      </v-row>

      <v-snackbar bottom :timeout="10000" v-model="snackbar" :color="snackbarColor">
        {{ snackbarText }}

        <v-btn text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>

    </v-content>
  </v-app>
</template>

<script lang="ts">

import "reflect-metadata"
import { Vue, Component, Prop, Ref, Emit } from "vue-property-decorator"
import { State, Mutation, Action } from 'vuex-class';

import { Player } from "schemas/player"
import { Players } from "schemas/players"
import { CreatePlayer, ImportPlayers } from "./store"

import COUNTRIES from "country-json/src/country-by-abbreviation.json"

import clone from "clone"
const FileSaver = require("file-saver");

@Component
export default class App extends Vue {
  @State("players") playersState!: Players
  @Mutation createPlayer!: CreatePlayer
  @Mutation importPlayers!: ImportPlayers
  @Ref("inputUpload") readonly inputUpload!: HTMLInputElement

  search: string = ""
  valid: boolean = true
  registerDialog: boolean = false
  snackbar: boolean = false

  snackbarText: string = ""
  snackbarColor: string = ""

  readonly defaultPlayer: Player = {
    id: -1,
    smashId: -1,
    name: "",
    team: "",
    gamerTag: "",
    country: "",
    twitter: "",
    isActive: true,
  }

  localPlayer: Player = this.defaultPlayer

  readonly countries: Array<{country: string, abbreviation: string}> = COUNTRIES

  created(): void {
    this.$root.$on("playerWasDeleted", () => {
      this.createSnackbar("Player successfully deleted.")
    })
  }

  createSnackbar(text: string, color?: string) {
    this.snackbarColor = color ? color : ""
    this.snackbarText = text
    this.snackbar = true
  }

  uploadPlayersJson(): void {
    this.inputUpload.click()
  }

  importPlayersCallback(file: File): void {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      fileReader.abort()

      try {
        let players = JSON.parse(event!.target!.result!.toString())!
        this.importPlayers(players)
        this.createSnackbar("Successfully imported players.")
      } catch (e) {
        this.createSnackbar("Error occured while parsing players.", "error")
        console.error(e)
      }
    }

    fileReader.onerror = (event) => {
      this.createSnackbar("Error occured while importing players.", "error")
    }

    fileReader.readAsText(file)
    this.inputUpload.value = ""
  }

  exportPlayers(): void {
    const blob = new Blob([JSON.stringify(this.players)], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "runback-exported-players.json");
  }

  readonly dropdownItems: Array<{title: string, event: Function}> = [
    { title: "Import players", event: this.uploadPlayersJson },
    { title: "Export players", event: this.exportPlayers },
  ]

  readonly gamerTagRules: Array<Function> = [
    (v: string) => !!v || 'Gamertag is required'
  ]

  readonly countryRules: Array<Function> = [
    (v: string) => !!v || 'Country is required'
  ]

  readonly nameRules: Array<Function> = [
    (v: string) => !!v || 'Name is required'
  ]

  clearForm(): void {
    let form = (this.$refs.form as Vue & { resetValidation: () => void })
    if (typeof form !== 'undefined') {
      form.resetValidation()
    }

    this.localPlayer = clone(this.defaultPlayer)
  }

  submitRegisterPlayer(): void {
    this.registerDialog = false
    this.createPlayer(this.localPlayer)
    this.createSnackbar("Successfully registered player.")
  }

  get players(): Players {
    return this.playersState
  }

  get filterPlayers(): Players {
    function displayName(p: Player): string {
      return p.team ? p.team + " | " + p.gamerTag : p.gamerTag
    }

    return this.players.filter(i =>
      i.isActive && displayName(i).toLowerCase().includes(this.search.toLowerCase())
    ).sort((a, b) =>
      displayName(a).localeCompare(displayName(b))
    )
  }
}
</script>
