<template>
  <div class="player-card">
    <v-card>

      <v-toolbar dense dark color="secondary">
        <v-toolbar-title>
          <div class="body-1 text-truncate">
            {{ team + " | " + gamerTag  }}
          </div>
        </v-toolbar-title>
      </v-toolbar>

      <v-row no-gutters align="end" justify="end">
        <v-col cols="10">

          <v-card-text>

            <v-row class="my-n3">
              <v-col cols="12">
                <div class="text-truncate">
                  {{ name }}
                </div>
              </v-col>
            </v-row>

            <v-row class="my-n3">
              <v-col cols="12">
                <div class="text-truncate">
                  {{ country }}
                </div>
              </v-col>
            </v-row>

          </v-card-text>

        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="2" align="end" justify="end">
          <v-btn text icon >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-col>

      </v-row>

    </v-card>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Vue, Component, Prop, Provide } from 'vue-property-decorator';

@Component
export default class PlayerCard extends Vue {
  @Prop({default: 'Name'}) name!: string
  @Prop({default: 'Gamertag'}) gamerTag!: string
  @Prop({default: 'Team'}) team!: string
  @Prop({default: 'Country'}) country!: string
}

</script>

<style>
.no-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
