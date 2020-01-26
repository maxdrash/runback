<template>
  <div class="tournament">
    <v-container>

      <v-autocomplete
        :items="PROGRESS_LIST"
        v-model="localBracket.progress"
        label="Tournament progress"
        item-text="text"
        item-value="value"
        required
        @change="setProgress(localBracket.progress)"
        ></v-autocomplete>

        <v-autocomplete
          :items="SIDE_LIST"
          v-model="localBracket.side"
          label="Bracket side"
          item-text="text"
          item-value="value"
          required
          @change="setSide(localBracket.side)"
          ></v-autocomplete>

          <v-autocomplete
            :items="FINALS_LIST"
            v-model="localBracket.finals"
            label="Grand Finals progress"
            item-text="text"
            item-value="value"
            required
            @change="setFinals(localBracket.finals)"
            ></v-autocomplete>
      <v-row class="my-n6">
        <v-col cols="9">
          <v-text-field
            v-model="localBracket.customProgress"
            label="Custom tournament progress"
            required
            @change="setCustomProgress(localBracket.customProgress)"
            ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            v-model="localBracket.shouldOverrideProgress"
            label="Override"
            @change="setShouldOverrideProgress(localBracket.shouldOverrideProgress)"
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

  localBracket!: Bracket
  valid: boolean = false

  created(): void {
    this.localBracket = clone(this.bracketState)
  }

  readonly PROGRESS_LIST: Array<{name: string, value: number}> = BRACKET_RULES.progressList
  readonly SIDE_LIST: Array<{name: string, value: number}> = BRACKET_RULES.sideList
  readonly FINALS_LIST: Array<{name: string, value: number}> = BRACKET_RULES.finalsList
}
</script>
