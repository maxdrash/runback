<template>
  <div class="panel">
    <v-card>
      <v-row no-gutters>
        <v-toolbar dark color="primary">
          <v-icon> mdi-{{ icon }} </v-icon>
          <v-toolbar-title class="white--text ml-3">
            {{ title }}
          </v-toolbar-title>
        </v-toolbar>
      </v-row>
        <v-card-text v-if="addCardText">
          <slot>Content</slot>
        </v-card-text>
        <slot v-else>Content</slot>
    </v-card>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Vue, Component, Prop, Provide } from 'vue-property-decorator';

@Component
export default class Panel extends Vue {
  @Prop({default: 'Title'}) title!: string
  @Prop({default: ''}) icon!: string
  @Prop({default: true}) addCardText!: boolean
}

</script>
