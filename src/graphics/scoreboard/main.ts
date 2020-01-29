/* eslint no-new: off, @typescript-eslint/explicit-function-return-type: off */

import Vue from "vue"
import App from "./main.vue"
import waitForReplicants from "./store"
import "@/dashboard/_misc/fonts/roboto.css"

import FitText from "../../../node_modules/vue-fit-text/src/fitText.vue"
Vue.component("fit-text", FitText)

waitForReplicants().then((store) => {
  new Vue({
    store,
    el: "#App",
    render: (h) => h(App),
  });
});
