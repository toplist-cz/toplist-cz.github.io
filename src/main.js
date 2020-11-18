import Vue from "vue"
import App from "./App.vue"
import store from "./store/index.js"

import VueMoment from "vue-moment"
import moment from "moment"
// import "moment/locale/cs"

import Buefy from "buefy"
import "buefy/dist/buefy.css"

import "./assets/gridlex.min.css"
import "./assets/icofont.min.css"

async function importLocales () {
	await import("moment/locale/" + process.env.VUE_APP_LANGUAGE)
}

importLocales()

Vue.use(VueMoment, {
	moment
})

Vue.filter("capitalize", function (value) {
	if (!value) return ""
	value = value.toString()
	return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.use(Buefy, { defaultIconPack: "fas" })

Vue.config.productionTip = false

new Vue({
	store,
	render: h => h(App)
}).$mount("#app")
