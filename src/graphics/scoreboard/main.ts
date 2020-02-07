/* eslint no-new: off, @typescript-eslint/explicit-function-return-type: off */

import Vue from "vue"
import App from "./main.vue"
import waitForReplicants from "./store"
import "../_misc/fonts/bebas.css"
import "../_misc/fonts/gilroy.css"
import "../_misc/fonts/rounded-mplus.css"

import Fitty from "./components/fitty.vue"
Vue.component("fit-text", Fitty)

waitForReplicants().then((store) => {
  new Vue({
    store,
    el: "#App",
    render: (h) => h(App),
  });
});
