<template>
  <v-app>
    <v-content>
      <v-row align="center" justify="center">
        <v-col cols="12" :sm="9" :md="6">
          <v-card>
            <v-card-text class="pa-6">
              <v-row>
                <v-col cols="12">
                  <img class="my-n2" src="./img/logo.svg">

                  <v-divider class="mt-10"></v-divider>
                </v-col>
              </v-row>

              <v-row align="center" class="mt-2">
                <v-col cols="6" class="pa-0">

                  <v-row>
                    <v-col class="pa-0">

                      <v-row align="center" justify="center">
                        <div class="text-center">
                          Version {{ version }}
                        </div>
                      </v-row>

                      <v-row align="center" justify="center">
                        <div class="text-center">
                          Check us out on <a :href="github" target="_blank">Github</a>
                        </div>
                      </v-row>

                    </v-col>
                  </v-row>

                </v-col>

                <v-col cols="6" class="pa-0">
                  <v-row align="center" justify="center">

                    <v-col cols="auto" align="center" class="pa-0">
                      <a :href="twitter" target="_blank">
                        <v-avatar :size="60">
                          <v-img :src="require('./img/opeik.png')" aspect-ratio="1"></v-img>
                        </v-avatar>
                      </a>
                    </v-col>

                    <v-col cols="auto" class="pa-0 ml-4">
                      <span class="text-break">
                        Developed by <a :href="twitter" target="_blank">opeik</a>
                      </span>
                    </v-col>

                  </v-row>
                </v-col>
              </v-row>

            </v-card-text>

          </v-card>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script lang="ts">

import "reflect-metadata"
import { Vue, Component, Prop } from "vue-property-decorator"
import { State, Mutation, Action } from "vuex-class"

const VERSION = require("@/../package.json").version

@Component
export default class App extends Vue {
  version: string = VERSION
  github: string = "https://github.com/opeik/runback"
  twitter: string = "https://twitter.com/iamopeik"
}

</script>
