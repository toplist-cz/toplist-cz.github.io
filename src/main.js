import Vue from "vue"
import App from "./App.vue"
import store from "./store/index.js"

import VueMoment from "vue-moment"
import moment from "moment"

import Buefy from "buefy"
import "buefy/dist/buefy.css"

import "./assets/gridlex.min.css"
import "./assets/icofont.min.css"
import i18n from "./i18n.js"
import router from "./router/index.js"

async function importLocales () {
	let locale = process.env.VUE_APP_I18N_LOCALE
	if (locale === "en") {
		locale = "en-gb"
	}
	await import("moment/locale/" + locale)
}

importLocales()

Vue.use(VueMoment, {
	moment
})

Vue.use(Buefy, { defaultIconPack: "fas" })

Vue.filter("capitalize", function (value) {
	if (!value) return ""
	value = value.toString()
	return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.config.productionTip = false

new Vue({
	store,
	i18n,
	router,
	render: h => h(App)
}).$mount("#app")
