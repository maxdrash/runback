<template>
  <span class="fit"><slot></slot></span>
</template>

<script lang="ts">
import "reflect-metadata"
import { Vue, Component, Prop, Provide } from "vue-property-decorator"

import fitty from "fitty"

@Component
export default class Fitty extends Vue {
  @Prop({default: {minSize: 16, maxSize: 512, multiLine: false}}) options!:
    {minSize: number, maxSize: number, multiLine: boolean}

  _fitty: any

  fit() {
    console.log("Fitted")
    this._fitty.fit()
  }

  destroyed() {
    this._fitty.unsubscribe()
  }

  mounted() {
    this._fitty = fitty(this.$el! as HTMLElement, this.options!)
  }
}
</script>

<style scoped>
.fit {
  display: inline-block;
  white-space: nowrap;
}
</style>
