import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		API_URL: "https://profi.toplist.cz",
		isLoggedIn: false,
		toplistId: null,
		availableReports: null,
		statisticsData: null,
		isSettingsBoxVisible: false,
		displayNewReport: false,
		newReportData: null
	},
	getters: {
		toplistId: (state) => state.toplistId,
		setAvailableReports: (state) => state.availableReports
	},
	mutations: {
		setIsLoggedIn: (state, statisticsData) => {
			state.isLoggedIn = statisticsData
		},
		setToplistId: (state, toplistId) => {
			state.toplistId = toplistId
		},
		setAvailableReports: (state, reports) => {
			state.availableReports = reports
		},
		setStatisticsData: (state, statisticsData) => {
			state.statisticsData = statisticsData
		},
		setSettingsBoxVisible: (state, settingsBoxVisible) => {
			state.isSettingsBoxVisible = settingsBoxVisible
		},
		setDisplayNewReport: (state, displayNewReport) => {
			state.displayNewReport = displayNewReport
		},
		setNewReportData: (state, newReportData) => {
			state.newReportData = newReportData
		}
	},
	actions: {
	},
	modules: {
	}
})
