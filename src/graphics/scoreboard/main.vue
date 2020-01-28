<template>
  <div>
    <img src="./img/main.svg" class="main">
    <img src="./img/name1.svg" class="name name-p1">
    <img src="./img/name2.svg" class="name name-p2">
    <div class="flag-mask flag-p2">
      <img :src="flagPath('rs')" class="flag flag-p2">
    </div>
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

  flagPath(country: string): string {
    return require("@/../node_modules/region-flags/svg/" +
      country.toUpperCase() + ".svg")
  }
}
</script>

<style>
.main {
  position: absolute;
  top: 0%;
  left: calc(50% - (20% / 2));
  width: 20%;
  z-index: 0;
  filter: drop-shadow(0px 5px 5px #222);
}

.name {
  position: absolute;
  top: 0%;
  width: 20%;
  z-index: -1;
  filter: drop-shadow(0px 5px 5px #222);
}

.name-p1 {
  left: 23%;
}

.name-p2 {
  right: 23%;
}

.flag-mask {
  position: absolute;
  top: 0%;
   width: 5.5%;
   height: 2.25vw;
   filter: drop-shadow(0px 5px 5px #222);
}

.flag {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.flag-p1 {
  left: 21%;
  clip-path: polygon(0 0, 75% 0, 100% 100%, 25% 100%);
}

.flag-p2 {
  right: 20%;
  clip-path: polygon(25% 0, 100% 0, 85% 100%, 0 100%);
}

</style>
