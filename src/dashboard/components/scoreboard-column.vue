<template>
  <div class="player">

    <v-row align="center" justify="center">
      <div class="headline justify-center black--text">
        {{ gamerTag !== "" ? gamerTag : "‎" }}
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
          {{ score }}
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
        :items="players"
        label="Player"
        outlined
        v-model="player"
        ></v-autocomplete>

        <v-row justify="center">
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

                  <v-text-field
                    v-model="gamerTag"
                    :rules="gamerTagRules"
                    label="Gamertag*"
                    required
                    ></v-text-field>

                    <v-text-field
                      v-model="team"
                      label="Team"
                      ></v-text-field>

                      <v-autocomplete
                        :items="countries"
                        :rules="countryRules"
                        item-text="country"
                        item-value="abbreviation"
                        label="Country*"
                        required
                        ></v-autocomplete>

                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

    </v-container>
  </div>
</template>

<script lang="ts">
import "reflect-metadata"
import { Vue, Component, Prop, Provide } from "vue-property-decorator"
import COUNTRIES from "country-json/src/country-by-abbreviation.json"

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

@Component
export default class ScoreboardColumn extends Vue {
  readonly MIN: number = 0
  readonly MAX: number = 99

  player: string = ""
  score: number = 0
  gamerTag: string = "Player"
  team: string = ""
  country: string = "foo"
  dialog: boolean = false
  countries: Array<{name: string, abbreviation: string}> = COUNTRIES

  players: Array<string> = ['Foo', 'Bar', 'Fizz', 'Buzz']

  gamerTagRules: Array<Function> = [
    (v: string) => !!v || 'Gamertag is required'
  ]

  countryRules: Array<Function> = [
    (v: string) => !!v || 'Country is required'
  ]

  updateScore(wasPlus: boolean) {
    this.score = clamp(this.score + (wasPlus ? 1 : -1), this.MIN, this.MAX)
  }
}
</script>
