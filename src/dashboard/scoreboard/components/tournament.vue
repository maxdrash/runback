<template>
  <div class="tournament">
    <v-container>

      <v-autocomplete
        :items="progressList"
        v-model="bracket.progress"
        label="Tournament progress"
        item-text="text"
        item-value="value"
        required
        @change="updateBracket(bracketState)"
        ></v-autocomplete>

        <v-autocomplete
          :items="sideList"
          v-model="bracket.side"
          label="Bracket side"
          item-text="text"
          item-value="value"
          required
          @change="updateBracket(bracketState)"
          ></v-autocomplete>

          <v-autocomplete
            :items="finalsList"
            v-model="bracket.finals"
            label="Grand Finals progress"
            item-text="text"
            item-value="value"
            required
            @change="updateBracket(bracketState)"
            ></v-autocomplete>
      <v-row class="my-n6">
        <v-col cols="9">
          <v-text-field
            v-model="bracket.customProgress"
            label="Custom tournament progress"
            required
            @change="updateBracket(bracketState)"
            ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            v-model="bracket.shouldOverride"
            label="Override"
            @change="updateBracket(bracketState)"
            ></v-checkbox>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script lang="ts">
import "reflect-metadata"
import { Vue, Component, Prop, Provide } from "vue-property-decorator"
import { State, Action, Mutation } from 'vuex-class';

import { UpdateBracket } from "../store"
import { Bracket } from "schemas/bracket"
const BRACKET_RULES = require("@/rules/bracket.json")

@Component
export default class Tournament extends Vue {
  @State("bracket") bracketState!: Bracket
  @Mutation updateBracket!: UpdateBracket

  valid: boolean = false

  get bracket(): Bracket {
    return this.bracketState
  }

  progressList: Array<{name: string, value: number}> = BRACKET_RULES.progressList
  sideList: Array<{name: string, value: number}> = BRACKET_RULES.sideList
  finalsList: Array<{name: string, value: number}> = BRACKET_RULES.finalsList

}
</script>
