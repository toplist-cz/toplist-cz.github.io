import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		API_URL: "https://profi.toplist.cz"
	},
	getters: {
		getApiUrl: state => {
			return state.API_URL
		},
		getToken: () => {
			const matches = document.cookie.match(new RegExp(
				"(?:^|; )" + "authToken".replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
			))
			return matches ? decodeURIComponent(matches[1]) : undefined
		}
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})
