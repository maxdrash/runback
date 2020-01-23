<template>
  <v-app>
    <v-content>
      <v-row>
        <v-col cols="12">
          <panel title="Player Management" icon="account-edit" :addCardText="false">
          <v-toolbar>

            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in dropdownItems"
                  :key="index"
                  @click=""
                  >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-row>
              <v-col cols="12" :md="3">
                <v-text-field
                  hide-details
                  prepend-icon="mdi-magnify"
                  single-line
                  placeholder="Search"
                  ></v-text-field>
              </v-col>
            </v-row>
          </v-toolbar>
          <v-card-text>
            <v-row>

              <v-col cols="6" :sm="4" :md="3">
                <player-card></player-card>
              </v-col>

            </v-row>
          </v-card-text>
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
  dropdownItems: Array<{title: string}> = [
    { title: "Import players" },
    { title: "Export players" },
  ]
}
</script>
