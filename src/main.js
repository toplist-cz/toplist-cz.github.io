import Vue from "vue"
import App from "./App.vue"
import store from "./store/index.js"

import { Table } from "buefy"
import "buefy/dist/buefy.css"

import "./assets/gridlex.min.css"
import "./assets/icofont.min.css"

Vue.use(Table)

Vue.config.productionTip = false

new Vue({
	store,
	render: h => h(App)
}).$mount("#app")
