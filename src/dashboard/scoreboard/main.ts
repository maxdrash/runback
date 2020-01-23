/* eslint no-new: off, @typescript-eslint/explicit-function-return-type: off */

import Vue from "vue"
import vuetify from "../_misc/vuetify"
import App from "./main.vue"
import waitForReplicants from "../store"
import Scoreboard from "../components/scoreboard.vue"
import Tournament from "../components/tournament.vue"
import ScoreboardColumn from "../components/scoreboard-column.vue"
import Panel from "../components/panel.vue"

Vue.component("scoreboard", Scoreboard)
Vue.component("tournament", Tournament)
Vue.component("panel", Panel)
Vue.component("scoreboard-column", ScoreboardColumn)

waitForReplicants().then((store) => {
  new Vue({
    vuetify,
    store,
    el: "#App",
    render: (h) => h(App),
  })
})
