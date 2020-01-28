<template>
  <div class="tournament">
    <v-container>

      <v-autocomplete
        :items="progressList"
        v-model="progress"
        label="Tournament progress"
        item-text="text"
        item-value="value"
        required
        ></v-autocomplete>

        <v-autocomplete
          :items="sideList"
          v-model="side"
          label="Bracket side"
          item-text="text"
          item-value="value"
          :disabled="!shouldDisableFinals"
          required
          ></v-autocomplete>

          <v-autocomplete
            :items="finalsList"
            v-model="finals"
            label="Grand Finals progress"
            item-text="text"
            item-value="value"
            :disabled="shouldDisableFinals"
            required
            ></v-autocomplete>
      <v-row class="my-n6">
        <v-col cols="9">
          <v-text-field
            v-model="customProgress"
            label="Custom tournament progress"
            required
            ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            v-model="shouldOverrideProgress"
            label="Override"
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

import { SetSide,
  SetProgress,
  SetFinals,
  SetCustomProgress,
  SetShouldOverrideProgress
} from "../store"

import { Bracket } from "schemas/bracket"

import clone from "clone"
const BRACKET_RULES = require("@/rules/bracket.json")

@Component
export default class Tournament extends Vue {
  @State("bracket") bracketState!: Bracket
  @Mutation setSide!: SetSide
  @Mutation setProgress!: SetProgress
  @Mutation setFinals!: SetFinals
  @Mutation setCustomProgress!: SetCustomProgress
  @Mutation setShouldOverrideProgress!: SetShouldOverrideProgress

  valid: boolean = false

  get bracket() {
    return this.bracketState
  }

  get side() {
    return this.bracket.side
  }

  set side(side: number) {
    this.setSide(side)
  }

  get progress() {
    return this.bracket.progress
  }

  set progress(progress: number) {
    this.setProgress(progress)
  }

  get finals() {
    return this.bracket.finals
  }

  set finals(finals: number) {
    this.setFinals(finals)
  }

  get customProgress() {
    return this.bracket.customProgress
  }

  set customProgress(customProgress: string) {
    this.setCustomProgress(customProgress)
  }

  get shouldOverrideProgress() {
    return this.bracket.shouldOverrideProgress
  }

  set shouldOverrideProgress(shouldOverrideProgress: boolean) {
    this.setShouldOverrideProgress(shouldOverrideProgress)
  }

  get shouldDisableFinals() {
    const grandFinals: number = 13

    return this.progress !== grandFinals
  }

  readonly progressList: Array<{name: string, value: number}> = BRACKET_RULES.progressList
  readonly sideList: Array<{name: string, value: number}> = BRACKET_RULES.sideList
  readonly finalsList: Array<{name: string, value: number}> = BRACKET_RULES.finalsList
}
</script>
