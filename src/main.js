import Vue from "vue"
import App from "./App.vue"
import store from "./store/index.js"
import VueMoment from "vue-moment"
import moment from "moment"
import Buefy from "buefy"
import "buefy/dist/buefy.css"
import "./assets/gridlex.min.css"
import i18n from "./i18n.js"
import router from "./router/index.js"
import checkView from "vue-check-view"
import vueScrollTo from "vue-scrollto"
import VueCountdown from "@chenfengyuan/vue-countdown"

import Raven from "raven-js"
import RavenVue from "raven-js/plugins/vue"

import { library } from "@fortawesome/fontawesome-svg-core"
import {
	faPlus,
	faAngleLeft,
	faAngleRight,
	faCog,
	faSignOutAlt,
	faChartPie,
	faChartLine,
	faArrowRight,
	faArrowLeft,
	faTimes,
	faCheckCircle,
	faExclamationTriangle,
	faExclamationCircle,
	faArrowUp,
	faArrowDown,
	faSignInAlt,
	faList,
	faSearch
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(
	faList,
	faPlus,
	faAngleLeft,
	faAngleRight,
	faCog,
	faSignOutAlt,
	faChartPie,
	faChartLine,
	faArrowRight,
	faArrowLeft,
	faTimes,
	faCheckCircle,
	faExclamationTriangle,
	faExclamationCircle,
	faArrowUp,
	faArrowDown,
	faSignInAlt,
	faSearch
)

Vue.component("vue-fontawesome", FontAwesomeIcon)
Vue.use(Buefy, {
	defaultIconComponent: "vue-fontawesome",
	defaultIconPack: "fas",
	customIconPacks: {
		fas: {
			sizes: {
				default: "lg",
				"is-small": "1x",
				"is-medium": "2x",
				"is-large": "3x"
			},
			iconPrefix: ""
		}
	}
})

Raven
	.config("https://f765a3567db64267bfac4402aac6f961@sentry.toplist.cz/14")
	.addPlugin(RavenVue, Vue)
	.install()

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
Vue.use(checkView)
Vue.use(vueScrollTo)
Vue.component(VueCountdown.name, VueCountdown)

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
