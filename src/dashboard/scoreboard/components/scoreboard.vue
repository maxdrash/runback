<template>
  <div class="scoreboard-container">
    <v-container>
      <v-row>
        <v-col cols="6">
          <scoreboard-column num="1"></scoreboard-column>
        </v-col>
        <v-col cols="6">
          <scoreboard-column num="2"></scoreboard-column>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="my-2 mt-n4">
      <v-divider></v-divider>

      <v-row align="center" justify="center" class="mt-8">
        <v-btn color="primary" class="mx-2">
          <v-icon left>mdi-check</v-icon>
          Update
        </v-btn>
        <v-btn class="mx-2">
          <v-icon left>mdi-swap-horizontal</v-icon>
          Swap
        </v-btn>
        <v-btn color="error" class="mx-2">
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

@Component
export default class Scoreboard extends Vue {}
</script>
