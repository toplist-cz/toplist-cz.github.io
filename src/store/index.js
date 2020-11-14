import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		API_URL: "https://profi.toplist.cz",
		toplistId: null,
		availableReports: null,
		statisticsData: null
	},
	getters: {
		toplistId: (state) => state.toplistId,
		setAvailableReports: (state) => state.availableReports
	},
	mutations: {
		setToplistId: (state, toplistId) => {
			state.toplistId = toplistId
		},
		setAvailableReports: (state, reports) => {
			state.availableReports = reports
		},
		setStatisticsData: (state, statisticsData) => {
			state.statisticsData = statisticsData
		}
	},
	actions: {
	},
	modules: {
	}
})
