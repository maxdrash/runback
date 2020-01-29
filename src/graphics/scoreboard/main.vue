<template>
  <div class="base">
    <div class="flex">
      <img src="./img/main.svg" class="main main-ani">
      <img src="./img/back.svg" class="back">
    </div>

    <div class="flex">
      <div class="name-wrapper name-wrapper-p1">
        <img src="./img/name1.svg" class="name name-p1 name-ani-p1">
      </div>
    </div>

    <div class="flex">
      <div class="name-wrapper name-wrapper-p2">
        <img src="./img/name2.svg" class="name name-p2 name-ani-p2">
      </div>
    </div>

    <div class="flex">
      <div class="flag-wrapper flag-wrapper-p1 flag-p1">
        <div class="flag-mask flag-mask-p1">
          <img :src="flagPath('au')" class="flag">
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="flag-wrapper flag-wrapper-p2 flag-p2">
        <div class="flag-mask flag-mask-p2">
          <img :src="flagPath('rs')" class="flag">
        </div>
      </div>
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
  height: 60px;
  z-index: 0;
  filter: drop-shadow(0px 5px 5px #222);
}

.name {
  height: 50px;
  z-index: -1;
  clip-path: polygon(100% 0%, 100% 0, 100% 100%, 100% 100%);
}

.name-wrapper {
  position: absolute;
  top: 0%;
  filter: drop-shadow(0px 2px 5px #222);
  z-index: -1;
}

.name-wrapper-p1 {
  padding-right: 850px;
}

.name-wrapper-p2 {
  padding-left: 850px;
}

.flex {
  display: flex;
  justify-content: center;
}

.back {
  position: absolute;
  top: 0%;
  height: 50px;
  z-index: -2;
  animation: slide-down 0.8s ease-in-out forwards;
  transform:translate3d(0,0,0);
}

.flag-mask {
  width: 100%;
  height: 50px;
}

.flag-wrapper {
  width: 120px;
  height: 70px;
  position: absolute;
  top: 0%;
  padding: 10px;
  margin: -10px;
  filter: drop-shadow(0px 2px 5px #222);
}

.flag {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.flag-mask-p1 {
  clip-path: polygon(0 0, 75% 0, 100% 100%, 25% 100%);
}

.flag-mask-p2 {
  clip-path: polygon(25% 0, 100% 0, 75% 100%, 0 100%);
}

.flag-p1 {
  padding-right: 1350px;
  animation: wipe-left 1s ease-in-out forwards;
  transform:translate3d(0,0,0);
  animation-delay: 1.5s;
  clip-path: polygon(100% 0%, 100% 0, 100% 100%, 100% 100%);
}

.flag-p2 {
  padding-left: 1350px;
  animation: wipe-right 1s ease-in-out forwards;
  transform:translate3d(0,0,0);
  animation-delay: 1.5s;
  clip-path: polygon(100% 0%, 100% 0, 100% 100%, 100% 100%);
}

.main-ani {
  animation: slide-down 1s ease-in-out forwards;
  transform:translate3d(0,0,0);
}

.name-ani-p1 {
  animation: wipe-left 1s ease-in-out forwards;
  transform:translate3d(0,0,0);
  animation-delay: 1.5s;
}

.name-ani-p2 {
  animation: wipe-right 1s ease-in-out forwards;
  transform:translate3d(0,0,0);
  animation-delay: 1.5s;
}

@keyframes slide-down {
  0% { top: -30% }
  100% { top: 0% }
}

@keyframes wipe-left {
  0% { clip-path: polygon(100% 0%, 100% 0, 100% 100%, 100% 100%); }
  100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
}

@keyframes wipe-right {
  0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
  100% { clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%); }
}

</style>
