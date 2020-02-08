<template>
  <v-app>
    <v-content>

      <v-row>

        <v-col cols="12" :md="6">
          <panel title="Scoreboard" icon="controller-classic">
          <scoreboard></scoreboard>
          </panel>
        </v-col>

        <v-col cols="12" :md="6">
          <panel title="Tournament" icon="tournament">
          <tournament></tournament>
          </panel>
        </v-col>

      </v-row>

    </v-content>
  </v-app>
</template>

<script lang="ts">

import "reflect-metadata"
import { Vue, Component, Prop } from "vue-property-decorator"

@Component
export default class App extends Vue {

}
</script>
