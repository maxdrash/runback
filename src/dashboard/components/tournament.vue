<template>
  <div class="tournament">
    <v-container>

      <v-autocomplete
        :items="progressList"
        :rules="progressRules"
        v-model="progress"
        item-text="text"
        item-value="value"
        label="Tournament progress"
        required
        ></v-autocomplete>

        <v-autocomplete
          :items="sideList"
          :rules="sideRules"
          v-model="side"
          item-text="text"
          item-value="value"
          label="Bracket side"
          required
          ></v-autocomplete>

          <v-autocomplete
            :items="finalsProgressList"
            :rules="finalsProgressRules"
            v-model="finalsProgress"
            item-text="text"
            item-value="value"
            label="Grand Finals progress"
            required
            ></v-autocomplete>
      <v-row class="my-n6">
        <v-col cols="9">
          <v-text-field
            v-model="customProgress"
            :rules="customProgressRules"
            label="Custom tournament progress"
            required
            ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-checkbox v-model="progressOverridden" label="Override"></v-checkbox>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-divider class="mb-6"></v-divider>
      <v-row align="center" justify="center">
        <v-btn color="primary" class="mx-2">
          <v-icon left>mdi-check</v-icon>
          Update
        </v-btn>
      </v-row>
    </v-container>

  </div>
</template>

<script lang="ts">
import "reflect-metadata"
import { Vue, Component, Prop, Provide } from "vue-property-decorator"
import RULES from "../../data/rules.json"

@Component
export default class Tournament extends Vue {
  valid: boolean = false;
  progressOverridden = false;

  customProgress: string = "";
  progress: number = 1;
  side: number = 1;
  finalsProgress: number = 1;

  progressList: Array<{name: string, value: number}> = RULES.bracketProgressList
  sideList: Array<{name: string, value: number}> = RULES.bracketSideList
  finalsProgressList: Array<{name: string, value: number}> = RULES.finalsProgressList

  progressRules: Array<Function> = [
    (v: number) => !!v || 'Tournament progress is required'
  ]

  sideRules: Array<Function> = [
    (v: number) => !!v || 'Tournament progress is required'
  ]

  finalsProgressRules: Array<Function> = [
    (v: number) => !!v || 'Grand Finals progress is required'
  ]

  customProgressRules: Array<Function> = [
    (v: string) => !!v || 'Custom progress is required'
  ]
}
</script>
