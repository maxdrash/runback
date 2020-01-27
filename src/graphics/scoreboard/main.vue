<template>
  <div>
    {{ players[scoreboard[0].playerId].gamerTag }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { Players } from "schemas/players"
import { Scoreboard } from "schemas/scoreboard"

@Component
export default class App extends Vue {
  @State("players") playersState!: Players
  @State("scoreboard") scoreboardState!: Scoreboard

  get players(): Players {
    return this.playersState
  }

  get scoreboard(): Scoreboard {
    return this.scoreboardState
  }
}
</script>
