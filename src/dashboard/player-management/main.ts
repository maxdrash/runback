/* eslint no-new: off, @typescript-eslint/explicit-function-return-type: off */

import Vue from "vue"
import vuetify from "../_misc/vuetify"
import App from "./main.vue"
import waitForReplicants from "./store"
import Panel from "../components/panel.vue"
import PlayerCard from "../components/player-card.vue"

Vue.component("panel", Panel)
Vue.component("player-card", PlayerCard);

waitForReplicants().then((store) => {
  new Vue({
    vuetify,
    store,
    el: "#App",
    render: (h) => h(App),
  });
});
